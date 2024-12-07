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
	description: {
		type: String,
		required: true,
		default: 'User@Z3r0_l0g0n'
	},
	flag: {
		type: String,
		required: true,
		default: 'Flag{Fake_flag}'
	}

})

const User = new mongoose.model("User",userSchema);
module.exports = User;