const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	email:{
		type: String,
		required: true,
		unique: true
	},
	username: {
		type: String,
		required:true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	is_admin: {
		type: Boolean,
		required: true,
		default: true
	}
})

const User = new mongoose.model("User",userSchema);
module.exports = User;
