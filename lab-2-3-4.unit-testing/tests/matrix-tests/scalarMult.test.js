const Matrix = require('./../../Matrix');

describe("Matrix: 'scalarMult' method", () => {
	// Фикстура - срабатывает перед каждым тестом
	beforeEach(() => {
		scalar1 = 2;

		matrix1 = [
			[1, 2, 3],
			[4, 5, 6]
		];

		result1 = [
			[2, 4, 6],
			[8, 10, 12]
		];
		
		m1 = new Matrix(matrix1)

		scalar2 = 6;

		matrix2 = [
			[1, 2],
			[4, 5]
		];

		result2 = [
			[6, 12],
			[24, 30]
		];

		m2 = new Matrix(matrix2)
	});

	test('should return the multiplied matrix', () => {
		expect(m1.scalarMult(scalar1)).toEqual(result1);
		expect(m2.scalarMult(scalar2)).toEqual(result2);
	});

	test("should throw 'Error' if invalid parameters are passed", () => {
		expect(() => {
			m1.scalarMult({ name: 'value' });
		}).toThrow();
		expect(() => {
			m2.scalarMult('2');
		}).toThrow();
	});
});
