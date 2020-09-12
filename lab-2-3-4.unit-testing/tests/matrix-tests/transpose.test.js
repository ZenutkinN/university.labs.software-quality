const Matrix = require('./../../Matrix');

describe("Matrix: 'transpose' method", () => {
	const matrix1 = [
		[2, 7, 23],
		[6, 2, 1],
		[0, 3, 0]
	];

	const result1 = [
		[2, 6, 0],
		[7, 2, 3],
		[23, 1, 0]
	];

	const matrix2 = [
		[125, 88],
		[35, 41],
		[0, 3]
	];

	const result2 = [
		[125, 35, 0],
		[88, 41, 3]
	];

	const matrix3 = [
		[798, 210, 12],
		[2320, 1294, 16]
	];

	const result3 = [
		[798, 2320],
		[210, 1294],
		[12, 16]
	];

	//Параметризованный тест
	test.each([
		[matrix1, result1],
		[matrix2, result2],
		[matrix3, result3]
	])('should return the transpose matrix', (matrix, result) => {
		const m = new Matrix(matrix);
		expect(m.transpose()).toEqual(result);
	});

	test("should throw 'Error' if invalid parameters are passed", () => {
		const m = new Matrix('');

		expect(() => {
			m.transpose();
		}).toThrow();
	});
});
