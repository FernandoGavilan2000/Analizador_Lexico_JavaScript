export default class Token {
	constructor(type, category, value) {
		this.typeToken = type;
		this.categoryToken = category;
		this.valueToken = value;
	}

	get_ValueToken() {
		return this.valueToken.toString();
	}

	get_TypeToken() {
		return this.typeToken.toString();
	}
	get_CategoryToken() {
		return this.categoryToken.toString();
	}
}
