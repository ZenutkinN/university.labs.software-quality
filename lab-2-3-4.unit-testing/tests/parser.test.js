const Parser = require('./../Parser');
const Token = require('./../Token');

describe('Parser: should return', () => {
	beforeEach(() => {
        parser = new Parser();
        token = new Token();
	});

	test("Matrix token if matrix string was passed", () => {
		expect(parser.processLine('1 2 3\n4 5 6\n7 8 9')).toBeInstanceOf(Token.Array());
	});

	test("Plus token if '+' string was passed", () => {
		expect(parser.processLine('+')).toBeInstanceOf(Token.Plus());
	});

	test("Minus token if '-' string was passed", () => {
		expect(parser.processLine('-')).toBeInstanceOf(Token.Minus());
	});

	test("Mult token if '*' string was passed", () => {
		expect(parser.processLine('*')).toBeInstanceOf(Token.Mult());
	});

	test("Div token if '/' string was passed", () => {
		expect(parser.processLine('/')).toBeInstanceOf(Token.Div());
	});
	
	test("Tilde token if '~' string was passed", () => {
		expect(parser.processLine('~')).toBeInstanceOf(Token.Tilde());
    });
    
	test("Div token if '' string was passed", () => {
		expect(parser.processLine('')).toBeInstanceOf(Token.EmptyString());
	});

	test('Error token if a random string was passed', () => {
		expect(parser.processLine('^$#')).toBeInstanceOf(Token.Error());
	});

	test('the Error if not a string was passed', () => {
		expect(() => {
			parser.processLine(null);
		}).toThrowError("It's necessary to pass a string");
	});
});
