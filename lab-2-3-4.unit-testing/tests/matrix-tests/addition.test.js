const Matrix = require('./../../Matrix');

describe("Matrix: 'addition' method", () => {
	// Фикстура - срабатывает перед каждым тестом
	beforeEach(() => {
		m1 = [
			[1, 2, 3],
			[4, 5, 6]
		];

		add1 = [
			[1, 2, 3],
			[4, 5, 6]
		];

		res1 = [
			[2, 4, 6],
			[8, 10, 12]
		];

		matrix1 = new Matrix(m1);

		m2 = [
			[1, 2],
			[4, 5]
		];

		add2 = [
			[4, 2],
			[6, 4]
		];

		res2 = [
			[5, 4],
			[10, 9]
		];

		matrix2 = new Matrix(m2);

		m3 = [
			[1, 2],
			[4, 5]
		];

		add3 = [
			[4, 2],
			[6, 4],
			[1, 2]
		];

		matrix3 = new Matrix(m3);
	});

	test('should return the summed matrix', () => {
		expect(matrix1.addition(add1)).toEqual(res1);
		expect(matrix2.addition(add2)).toEqual(res2);
	});

	test("should throw 'Error' if matrices have different rank", () => {
		expect(() => {
			matrix3.addition(add3);
		}).toThrowError('Summable matrices must be of the same rank');
	});
});
