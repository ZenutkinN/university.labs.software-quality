const Matrix = require('./../../Matrix');

describe("Matrix: 'parse' method should return", () => {
	// Классы эквивалентности
	// - квадратные матрицы
	const matrix1 = '1 2 3\n4 5 6\n7 8 9';
	const result1 = new Matrix([
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9]
	]);

	// - прямоугольные матрицы
	const matrix2 = '1 2\n4 5\n7 8';
	const result2 = new Matrix([
		[1, 2],
		[4, 5],
		[7, 8]
	]);

	// - вектор строка
	const matrix3 = '1 2 3';
	const result3 = new Matrix([[1, 2, 3]]);

	// - вектор столбец
	const matrix4 = '1\n2\n3';
	const result4 = new Matrix([[1], [2], [3]]);

	//Класс плохих данных
	const matrix5 = '1* ы2 3\n4 345 6\n7 %89';

	//Empty string
	const matrix6 = '';

	//Null
	const matrix7 = null;
	
	test.each([
		[matrix1, result1],
		[matrix2, result2],
		[matrix3, result3],
		[matrix4, result4],
	])('instance of Matrix class', (matrix, result) => {
        const m = new Matrix();
		expect(m.parse(matrix)).toEqual(result);
    });
    
	test.each([
		[matrix5],
		[matrix6],
		[matrix7],
	])('null if invalid data was passed', (matrix, result = null) => {
        const m = new Matrix();
		expect(m.parse(matrix)).toEqual(result);
	});
});
