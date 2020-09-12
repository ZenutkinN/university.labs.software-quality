const Parser = require('./../../Parser');
const Token = require('./../../Token');
const Matrix = require('./../../Matrix');
const Calc = require('./../../Calc');

describe('Addition test for 100% coverage of Calc class.', () => {
	test('If class Parser will be null it return new exception.', () => {
		expect(() => {
			const calc = new Calc();
		}).toThrow();
	});

	test("If '_processLine' method in 'Calc' class return null it should return 'FAILURE' status", () => {
		const parser = new Parser();
		jest.spyOn(parser, 'processLine').mockImplementation(() => null);

		const calc = new Calc(parser);
		const status = calc.step('+');

		expect(status).toEqual(calc.status.FAILURE);
	});
});
