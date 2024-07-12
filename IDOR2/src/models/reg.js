const mongoose = require("mongoose");
// creating schema template for post request
const uniqueValidator = require('mongoose-unique-validator')

const {v1:uuid1} =  require('uuid');
let val = uuid1()
const userSchema = new mongoose.Schema({
	email :{
		type: String,
		required: true,
		unique: true
	},
	username : {
		type: String,
		required:true
	},
	password : {
		type: String,
		required: true
	},
	password2 : {
		type : String,
		required: true
	},
	uid : {
		type : String,
		required: true,
		default: val
	}
})

userSchema.plugin(uniqueValidator,{message: `${{val}} is already registered`});

const User = new mongoose.model("User",userSchema);
module.exports = User;