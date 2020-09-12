const Parser = require('./../../Parser');
const Token = require('./../../Token');
const Matrix = require('./../../Matrix');
const Calc = require('./../../Calc');

describe("Class Calc in 'WAIT_FOR_INITIAL_VALUE' state should return", () => {
	let parser, calc;
	const token = new Token();

	const matrix = [
		[1, 2, 3],
		[4, 5, 6],
	];

	const matrixStr = '1 2 3\n4 5 6';

	// Перед каждым тестом формируем классs Parser и Calc
	beforeEach(() => {
		parser = new Parser();
		calc = new Calc(parser);
	});

	// После каждого теста отчищаем предидущий mock
	afterEach(() => {
		jest.restoreAllMocks();
	});

	//Параметризированные тест
	test.each([
		[matrixStr, 'SUCCESSFULL', new Matrix(matrix), () => token.getArray(new Matrix(matrix))],
		['+', 'ERR_NUMBER_EXPECTED', new Matrix(), () => token.getPlus()],
		['', 'ERR_NUMBER_EXPECTED', new Matrix(), () => token.getEmptyString()],
		['$#@', 'ERR_INVALID_INPUT', new Matrix(), () => token.getError()],
	])(
		"if the '%s' has been passed status should be %s",
		(input, resultStatus, resultAcc, mockFn) => {
			// Создаем mock метод processLine класса Parser
			jest.spyOn(parser, 'processLine').mockImplementation(mockFn);

			// Делаем шаг
			const status = calc.step(input);

			// Проверяем
			expect(status).toEqual(calc.status[resultStatus]);
			expect(calc.acc()).toEqual(resultAcc);
		}
	);
});
