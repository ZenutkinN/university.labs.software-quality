const Matrix = require('./../../Matrix');

describe("Matrix: 'mult' method", () => {
	// Фикстура - срабатывает перед каждым тестом
	beforeEach(() => {
		matrix1A = [
			[2, 7, 23],
			[6, 2, 1],
			[0, 3, 0]
		];

		matrix1B = [
			[5, 6],
			[0, 1],
			[5, 3]
		];

		result1 = [
			[125, 88],
			[35, 41],
			[0, 3]
		];

		m1A = new Matrix(matrix1A);

		matrix2A = [
			[7, 7],
			[46, 3]
		];

		matrix2B = [
			[46, 28],
			[68, 2]
		];

		result2 = [
			[798, 210],
			[2320, 1294]
		];

		m2A = new Matrix(matrix2A);

		falseMatrixA = [
			[1, 2, 3],
			[4, 5, 6]
		];

		falseMatrixB = [
			[1, 2, 3],
			[4, 5, 6]
		];

		falseA = new Matrix(falseMatrixA);
	});

	test('should return the multiplied matrix', () => {
		expect(m1A.mult(matrix1B)).toEqual(result1);
		expect(m2A.mult(matrix2B)).toEqual(result2);
	});

	test("should throw 'Error'if the number of columns of the first matrix is not equal to the number of rows of the second", () => {
		expect(() => {
			falseA.mult(falseMatrixB);
		}).toThrowError(
			'Number of columns of the first matrix is not equal to the number of rows of the second'
		);
	});

	test("should throw 'Error' if invalid parameters are passed", () => {
		expect(() => {
			m1A.mult('');
		}).toThrow();

		expect(() => {
			m2A.mult(2);
		}).toThrow();
	});
});
