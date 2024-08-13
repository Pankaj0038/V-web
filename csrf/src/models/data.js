const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	uid: {
		type: String,
		required: true,
		unique: true
	},
	balance: {
		type: Number,
		required: true,
		default: 1000
	}
})

const User = new mongoose.model('User',userSchema);
module.exports=User;