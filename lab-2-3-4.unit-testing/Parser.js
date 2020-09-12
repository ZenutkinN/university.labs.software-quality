const Token = require('./Token');
const Matrix = require('./Matrix');

const token = new Token();
const matrix = new Matrix();

class Parser {
	processLine(str) {
		if (typeof str !== 'string') {
			throw new Error("It's necessary to pass a string");
		}

		switch (str) {
			case '+':
				return token.getPlus();

			case '-':
				return token.getMinus();

			case '*':
				return token.getMult();

			case '/':
				return token.getDiv();

			case '~':
				return token.getTilde();

			case '':
				return token.getEmptyString();
        }
        
        const newMatrix = matrix.parse(str);

        if (newMatrix !== null) {
            return token.getArray(newMatrix);
        }

		return token.getError();
	}
}

module.exports = Parser;
