const mongoose = require("mongoose");
// Using Mongoose to connect with the mongo database 
// database name : heckedData
mongoose.connect("mongodb://0.0.0.0:27017/creds",).then(()=>{
	console.log(`connection successful`);
}).catch((e)=>{
	console.log(`Error: ${e}`)
})