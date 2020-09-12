const Parser = require('./../../Parser');
const Token = require('./../../Token');
const Matrix = require('./../../Matrix');
const Calc = require('./../../Calc');

describe("Class Calc uses '_perfomOperation' method", () => {
	let parser, calc;
    const token = new Token();

	let matrix1 = [
		[2, 154, 23],
		[6, 2, 1],
		[0, 235, 0],
	];

	let matrixStr1 = '2 154 23\n6 2 1\n0 235 0';

	let matrix2 = [
		[1, 2, 4],
		[45, 5, 6],
		[45, 25, 46],
	];

	let matrixStr2 = '1 2 4\n45 5 6\n45 25 46';

	// Перед каждым тестом формируем классs Parser и Calc
	beforeEach(() => {
		parser = new Parser();
		calc = new Calc(parser);

		// Calc доводим до состояния WAIT_FOR_OPERATOR
		calc.step(matrixStr1);
	});

	// После каждого теста отчищаем предидущий mock
	afterEach(() => {
		jest.restoreAllMocks();
	});

	//Параметризированные тест
	test.each([
		[
			'+',
			matrixStr2,
			'SUCCESSFULL',
			new Matrix(matrix1).addition(matrix2),
			() => token.getPlus(),
			() => token.getArray(new Matrix(matrix2)),
		],
		[
			'-',
			matrixStr2,
			'SUCCESSFULL',
			new Matrix(matrix1).equality(matrix2),
			() => token.getMinus(),
			() => token.getArray(new Matrix(matrix2)),
		],
		[
			'*',
			matrixStr2,
			'SUCCESSFULL',
			new Matrix(matrix1).mult(matrix2),
			() => token.getMult(),
			() => token.getArray(new Matrix(matrix2)),
		],
		[
			'/',
			matrixStr2,
			'SUCCESSFULL',
			new Matrix(matrix1).transpose(),
			() => token.getDiv(),
			() => token.getArray(new Matrix(matrix2)),
		],
		[
			'~',
			matrixStr2,
			'ERR_BAD_OPERATION',
			new Matrix(matrix1),
			() => token.getTilde(),
			() => token.getArray(new Matrix(matrix2)),
		],
	])(
		'with passed operator %s and argument %s should return %s status',
		(op, arg, resultStatus, resultAcc, mockFnOp, mockFnArg) => {
			// Создаем mock метод processLine класса Parser для состояния WAIT_FOR_OPERATOR
			jest.spyOn(parser, 'processLine').mockImplementation(mockFnOp);

			// Доводим до состояния WAIT_FOR_ARGUMENT
			let status = calc.step(op);

			// Создаем mock метод processLine класса Parser для состояния WAIT_FOR_ARGUMENT
			jest.spyOn(parser, 'processLine').mockImplementation(mockFnArg);

			//Делаем шаг
			status = calc.step(arg);

			// Проверяем
			expect(status).toEqual(calc.status[resultStatus]);
			expect(calc.acc()).toEqual(resultAcc);
		}
	);
});
