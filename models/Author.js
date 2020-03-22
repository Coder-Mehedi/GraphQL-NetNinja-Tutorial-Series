const { Schema, model } = require("mongoose");

const authorSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	age: {
		type: Number,
		required: true
	}
});

module.exports = model("Author", authorSchema);
