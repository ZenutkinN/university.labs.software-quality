const fs = require('fs');
const path = require('path');

const js2md = require('jsdoc-to-markdown');

/** Class representing a set of methods for worh with matrix. */
class Matrix {
	/**
	 * Create a matrix.
	 * @param {array} matrix - Two-dimensional array
	 */
	constructor(matrix) {
		this.matrix = matrix;
	}

	/**
	 * The 'equality' method allows to check the equivalence of matrices
	 * @param {array} matrix - Matrix or several matrices passed through a comma
	 * @return {boolean} - If matrices are equivalent, then 'true' will return otherwise 'false'
	 */
	equality(...matrices) {
		if (!this._isRanksEqual(matrices)) return false;

		const areElemsEqual = matrices
			.map(matrix => matrix.flat())
			.every((arr, idx, thisArr) => {
				return arr.every((elem, idx) => elem === thisArr[0][idx]);
			});

		if (!areElemsEqual) return false;

		return true;
	}

	/**
	 * The 'addition' method allows to summarize matrices
	 * @param {array} matrix - Matrix or several matrices passed through a comma
	 * @return {array} - This returns the summed matrix
	 */
	addition(...matrices) {
		if (!this._isRanksEqual(matrices))
			throw new Error('Summable matrices must be of the same rank');

		const flatSumMatrix = [this.matrix, ...matrices]
			.map(matrix => matrix.flat())
			.reduce((newArr, arr) => {
				return newArr.map((elem, idx) => elem + arr[idx]);
			});

		return this._getPrevMatrixFormat(matrices[0], flatSumMatrix);
	}

	/**
	 * The 'scalarMult' method allows to multiply the matrix by a scalar
	 * @param {integer} scalar - Scalar
	 * @return {array} - This returns the multiplied matrix
	 */
	scalarMult(scalar) {
		if (typeof scalar !== 'number') throw new Error('');

		const flatMultMatrix = this.matrix.flat().map(elem => elem * scalar);

		return this._getPrevMatrixFormat(this.matrix, flatMultMatrix);
	}

	/**
	 * The 'mult' method allows to multiply two matrices.
	 * The number of columns of the first matrix should be equal to the number of rows of the second matrix
	 * @param {array} matrix - Matrix
	 * @return {array} - This returns the multiplied matrix
	 */
	mult(B) {
		const A = this.matrix;

		if (!(A[0].length === B.length))
			throw Error(
				'Number of columns of the first matrix is not equal to the number of rows of the second'
			);

		const multMatrix = [];

		for (let i = 0; i < A.length; i++) {
			const newRow = [];
			for (let j = 0; j < B[0].length; j++) {
				let sumCell = 0;
				for (let k = 0; k < B.length; k++) {
					sumCell += A[i][k] * B[k][j];
				}
				newRow.push(sumCell);
			}
			multMatrix.push(newRow);
		}

		return multMatrix;
	}

	/**
	 * The 'transpose' method allows to swap rows and columns of the matrix.
	 * @return {array} - This returns the transpose matrix
	 */
	transpose() {
		const newMatrix = [];

		for (let i = 0; i < this.matrix[0].length; i++) {
			const newRow = [];

			for (let j = 0; j < this.matrix.length; j++) {
				newRow.push(this.matrix[j][i]);
			}

			newMatrix.push(newRow);
		}

		return newMatrix;
	}

	/**
	 * The 'parse' method allows to parse a string into two-dimensional array.
	 * The number of columns of the first matrix should be equal to the number of rows of the second matrix
	 * @param {string} str - String of type '1 2 3\n4 5 6\n7 8 9'
	 * @return {Matrix} - A Matrix instance
	 */
	parse(str) {
		// Проверка на
		// - не строку
		// - на пустую строку
		// - на класс плохих данных
		if (typeof str !== 'string' || str === '' || /[^\d\s]/.test(str)) {
			return null;
		}

		const matrix = str.match(/\d.*(?=\n?)/g).map(elem => elem.split(' ').map(Number));

		return new Matrix(matrix);
	}

	/**
	 * The 'tripleAnd' method allows to check for equality three objects.
	 * The number of columns of the first matrix should be equal to the number of rows of the second matrix
	 * @param {object} a - Object
	 * @param {object} b - Object
	 * @param {object} c - Object
	 * @return {boolean} - If objects are equal, then 'true' will return otherwise 'false'
	 */
	static tripleAnd(a, b, c) {
		if (a == b && b == c && a == c) return true;

		return false;
	}

	_isRanksEqual(matrices) {
		const ranks = [this.matrix, ...matrices].map(matrix => {
			const i = matrix[0].length;
			const j = matrix.length;

			return { i, j };
		});

		return ranks.every(({ i, j }) => {
			return i === ranks[0].i && j === ranks[0].j;
		});
	}

	_getPrevMatrixFormat(baseMatrix, formatArray) {
		const j = baseMatrix[0].length;

		const newMatrix = [];

		while (formatArray.length > 0) {
			newMatrix.push(formatArray.splice(0, j));
		}

		return newMatrix;
	}
}

module.exports = Matrix;

// Creating a markdown file README.md from JSDock
js2md
	.render({
		files: 'Matrix.js'
	})
	.then(md => {
		fs.writeFile(path.resolve(__dirname, 'README.md'), md, e => {
			if (e) throw e;
		});
	});
