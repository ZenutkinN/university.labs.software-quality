const Matrix = require('./Matrix');
const Token = require('./Token');
const Parser = require('./Parser');

class Calc {
	constructor(parser) {
		if (parser === undefined) throw new Error();

		this._parser = parser;
		this._acc = null;
		this._state = null;
		this._lastOpCode = null;

		this.status = {
			SUCCESSFULL: 'SUCCESSFULL',
			ERR_INVALID_INPUT: 'ERR_INVALID_INPUT',
			ERR_NUMBER_EXPECTED: 'ERR_NUMBER_EXPECTED',
			ERR_BAD_OPERATION: 'ERR_BAD_OPERATION',
			ERR_OPERATOR_EXPECTED: 'ERR_OPERATOR_EXPECTED',
			FAILURE: 'FAILURE',
		};

		this._stateEnum = {
			WAIT_FOR_INITIAL_VALUE: 'WAIT_FOR_INITIAL_VALUE',
			WAIT_FOR_OPERATOR: 'WAIT_FOR_OPERATOR',
			WAIT_FOR_ARGUMENT: 'WAIT_FOR_ARGUMENT',
		};

		this.resetState();
	}

	acc() {
		return this._acc;
	}

	step(input) {
		const token = this._parser.processLine(input);

		if (token === null) return this.status.FAILURE;
		if (token instanceof Token.Error()) return this.status.ERR_INVALID_INPUT;

		switch (this._state) {
			case this._stateEnum.WAIT_FOR_INITIAL_VALUE:
				if (token instanceof Token.Array()) {
					this._acc = token.value;
					this._state = this._stateEnum.WAIT_FOR_OPERATOR;

					return this.status.SUCCESSFULL;
				} else {
					return this.status.ERR_NUMBER_EXPECTED;
				}

			case this._stateEnum.WAIT_FOR_OPERATOR:
				if (
					token instanceof Token.Plus() ||
					token instanceof Token.Minus() ||
					token instanceof Token.Mult() ||
					token instanceof Token.Div() ||
					token instanceof Token.Tilde()
				) {
					this._state = this._stateEnum.WAIT_FOR_ARGUMENT;
					this._lastOpCode = token;

					return this.status.SUCCESSFULL;
				} else if (token instanceof Token.EmptyString()) {
					this.resetState();
					return this.status.SUCCESSFULL;
				} else {
					return this.status.ERR_OPERATOR_EXPECTED;
				}

			case this._stateEnum.WAIT_FOR_ARGUMENT:
				if (token instanceof Token.Array()) {
					const arg = token.value;
					const newAcc = this._perfomOperation(this._acc, arg, this._lastOpCode.value);

					if (newAcc === null) return this.status.ERR_BAD_OPERATION;

					this._acc = newAcc;
					this._state = this.status.WAIT_FOR_OPERATOR;

					return this.status.SUCCESSFULL;
				} else {
					return this.status.ERR_NUMBER_EXPECTED;
				}
		}
	}

	resetState() {
		this._state = this._stateEnum.WAIT_FOR_INITIAL_VALUE;
		this._lastOpCode = new Token().getError();
		this._acc = new Matrix();
	}

	_perfomOperation(acc, arg, opCode) {
		switch (opCode) {
			case 'PLUS':
				return acc.addition(arg.matrix);

			case 'MINUS':
				return acc.equality(arg.matrix);

			case 'MULT':
				return acc.mult(arg.matrix);

			case 'DIV':
				return acc.transpose();

			default:
				return null;
		}
	}
}

module.exports = Calc;

// const calc = new Calc(new Parser());
// console.log(calc.step('1 2 3\n4 5 6\n7 8 9'));
// console.log(calc.step('+'));
// console.log(calc.step('1 2 3\n4 5 6\n7 8 9'));
