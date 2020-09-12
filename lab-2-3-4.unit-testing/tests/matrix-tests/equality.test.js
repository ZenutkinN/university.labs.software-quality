const Matrix = require('./../../Matrix');

describe("Matrix: 'quality' method", () => {
	const matrix1 = [
		[1, 2, 3],
		[4, 5, 6]
	];

	const matrix2 = [
		[1, 2, 3],
		[4, 5, 6]
	];

	const matrix3 = [
		[1, 2],
		[4, 5]
	];

	const matrix4 = [
		[1, 2],
		[4, 5]
	];

	const matrix5 = [
		[1, 2, 3],
		[4, 5, 6]
	];

	const matrix6 = [
		[1, 4, 3],
		[4, 5, 6]
	];

	const errorData1 = 1;

	const errorData2 = { name: 'value' };

	//Параметризованный тест
	test.each([
		[true, matrix1, matrix2],
		[true, matrix3, matrix4, matrix3]
	])("should return 'true' if matrices are equivalent", (expected, m1, m2, m3 = null) => {
		const matrix = new Matrix(m1);

		if (!m3) {
			expect(matrix.equality(m2)).toBe(expected);
		} else {
			expect(matrix.equality(m2, m3)).toBe(expected);
		}
	});

	//Параметризованный тест
	test.each([
		[false, matrix1, matrix3, matrix2],
		[false, matrix3, matrix1, matrix3],
		[false, matrix5, matrix6, matrix5]
	])("should return 'false' if matrices are not equivalent", (expected, m1, m2, m3 = null) => {
		const matrix = new Matrix(m1);

		if (!m3) {
			expect(matrix.equality(m2)).toBe(expected);
		} else {
			expect(matrix.equality(m2, m3)).toBe(expected);
		}
	});

	//Параметризованный тест
	test.each([
		[matrix1, errorData1],
		[matrix1, errorData2]
	])("should throw 'Error' if invalid parameters are passed", (m1, errorData) => {
		const matrix = new Matrix(m1);
		expect(() => {
			matrix.equality(errorData);
		}).toThrow();
	});
});
