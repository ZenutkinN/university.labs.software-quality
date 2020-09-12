const Parser = require('./../../Parser');
const Token = require('./../../Token');
const Matrix = require('./../../Matrix');
const Calc = require('./../../Calc');

describe("Class Calc in 'WAIT_FOR_ARGUMENT' state should return", () => {
    let parser, calc;
    const token = new Token();

	let matrix1 = [
		[2, 7, 23],
		[6, 2, 1],
		[0, 3, 0],
	];

    let matrixStr1 = '2 7 23\n6 2 1\n0 3 0';
    
    let matrix2 = [
		[1, 2, 3],
		[4, 5, 6],
		[75, 25, 3],
    ];

    let matrixStr2 = '1 2 3\n4 5 6\n75 25 3';

	// Перед каждым тестом формируем классs Parser и Calc
	beforeEach(() => {
		parser = new Parser();
		calc = new Calc(parser);

		// Calc доводим до состояния WAIT_FOR_OPERATOR
        calc.step(matrixStr1);
        // Calc доводим до состояния WAIT_FOR_ARGUMENT
        calc.step('+');
	});

	// После каждого теста отчищаем предидущий mock
	afterEach(() => {
		jest.restoreAllMocks();
	});

	//Параметризированные тест
	test.each([
		[matrixStr2, 'SUCCESSFULL', new Matrix(matrix1).addition(matrix2), () => token.getArray(new Matrix(matrix2))],
		['', 'ERR_NUMBER_EXPECTED', new Matrix(matrix1), () => token.getEmptyString()],
		['#$@', 'ERR_INVALID_INPUT', new Matrix(matrix1), () => token.getError()],
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
	});
});