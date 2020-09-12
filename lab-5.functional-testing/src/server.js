const path = require('path');
const hapi = require('@hapi/hapi');

const startServer = async () => {
	const server = hapi.server({
		host: 'localhost',
		port: 3000,
		routes: {
			files: {
				relativeTo: path.join(__dirname, 'assets'),
			},
		},
	});

	await server.register(require('@hapi/inert'));

	server.route({
		method: 'GET',
		path: '/',
		handler: (req, res) => {
			return res.file('html/pizza.html');
		},
	});

	server.route({
		method: 'GET',
		path: '/css/{fileName}.css',
		handler: (req, res) => {
			const { fileName } = req.params;
			return res.file(`css/${fileName}.css`);
		},
	});

	server.route({
		method: 'GET',
		path: '/img/{fileName}.png',
		handler: (req, res) => {
			const { fileName } = req.params;
			return res.file(`img/${fileName}.png`);
		},
	});

	server.route({
		method: 'POST',
		path: '/order',
		config: {
			payload: {
				output: 'stream',
				parse: true,
				allow: 'multipart/form-data',
				multipart: true,
			},
			handler: (req, res) => {
				return req.payload;
			},
		},
	});

	await server.start();

	console.log(`Server is running on ${server.info.uri}`);
};

startServer();
