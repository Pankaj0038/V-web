// Load express JS
const express = require("express");
const app = express();
// const exphbs = require('express-handlebars');

// Call the database to connect
require("./db/conn")

// To fetch the template to post data
const {Register,count} = require("./models/reg.js")

// To operate with the path
const path = require("path")

// Either use given port or 3000
const port = process.env.PORT || 3000

// to Send JSON data to the database
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Running the front end
const stat_path = path.join(__dirname,"../public")
const temp_path = path.join(__dirname,"../templates/views")
app.use(express.static(stat_path));
app.set("view engine","hbs");
app.set("views",temp_path);
app.get("/login",(req,res)=>{
	res.render("login");
});
app.get("/reg",(req,res)=>{
	res.render("reg");
})

// let serialNumber = 3;
const unid = count;
console.log(unid);
// Generating post request to the server
app.post("/reg",async (req,res)=>{
	try{
		const pass = req.body.password;
		const cpass = req.body.password2
		if(pass === cpass){
			const user = new Register({
				username: req.body.username,
				password: pass,
				password2: cpass,
				uid: unid
			})
		const result = await user.save()
		res.status(201).redirect("login");
		// serialNumber++;
		} else {
			res.send('password not match')
		}
	}catch (err){
		res.status(400).send(err);
	}
});


app.post("/login",async (req,res)=>{
	try{
		const user= req.body.username;
		const pass = req.body.password;
		const uval = await Register.findOne({username:user});
		if(uval.password==pass){
			res.status(201).redirect(`users?uid=${uval.uid}`);}
	}catch (err){
		res.status(400).send(err);
	}
});



app.get("/users", async (req,res)=>{
	try{
		const mydat = await Register.findOne(req.query);
		res.status(200).render('user',{uname:mydat});
	}catch(err){
		console.log(err);
	};
})

// Running the server in the given port
app.listen(port, ()=>{
	console.log("Server is Running")
});