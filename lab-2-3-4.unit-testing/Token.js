class Token {
	static Array() {
		return Array;
	}

	static Plus() {
		return Plus;
	}

	static Minus() {
		return Minus;
	}

	static Mult() {
		return Mult;
	}

	static Div() {
		return Div;
	}

	static Tilde() {
		return Tilde;
	}

	static EmptyString() {
		return EmptyString;
	}

	static Error() {
		return Error;
	}

	getArray(value) {
		return new Array(value);
	}

	getPlus() {
		return new Plus();
	}

	getMinus() {
		return new Minus();
	}

	getMult() {
		return new Mult();
	}

	getDiv() {
		return new Div();
	}

	getTilde() {
		return new Tilde();
	}

	getEmptyString() {
		return new EmptyString();
	}

	getError() {
		return new Error();
	}
}

class Array extends Token {
	constructor(value) {
		super();
		this.value = value;
	}
}

class Plus extends Token {
	constructor() {
		super();
		this.value = 'PLUS';
	}
}

class Minus extends Token {
	constructor() {
		super();
		this.value = 'MINUS';
	}
}

class Mult extends Token {
	constructor() {
		super();
		this.value = 'MULT';
	}
}

class Div extends Token {
	constructor() {
		super();
		this.value = 'DIV';
	}
}

class Tilde extends Token {
	constructor() {
		super();
		this.value = 'TILDE';
	}
}

class EmptyString extends Token {
	constructor() {
		super();
	}
}

class Error extends Token {
	constructor() {
		super();
	}
}

module.exports = Token;
