const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/creds").then(()=>{
	console.log("Connection successfully");
}).catch((e)=>{
	console.log(`Error:${e}`);
})