const mongoose = require("mongoose");
// creating schema template for post request
const userSchema = new mongoose.Schema({
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
		type : Number,
		required: true
	}
})

const Login = new mongoose.model("Login",userSchema);

async function countDocument() {
	try{
		const total = await Login.countDocument();
		return total;
	} catch(err){console.log(err);}
}

count = countDocument()
module.exports = {Login,count};