const Matrix = require('./../../Matrix');

describe("Matrix: 'tripleAnd' method should return", () => {
	const matrix = [
		[1, 2],
		[3, 4]
	];

	const a = new Matrix(matrix);
	const b = new Matrix(matrix);

	test('true if all three params are equal', () => {
		expect(Matrix.tripleAnd(a, a, a)).toBe(true);
    });
    
	test('false if at least one parameter is not equal to the rest', () => {
		expect(Matrix.tripleAnd(b, a, a)).toBe(false);
	});
});
