// Load express JS
const express = require("express");
const app = express();
// const exphbs = require('express-handlebars');

// Call the database to connect
require("./db/conn")

// To fetch the template to post data
const Register = require("./models/reg.js")

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
// app.engine('hbs', exphbs.engine({ extname: '.hbs' }));
app.get("/login",(req,res)=>{
	res.render("login");
});
app.get("/reg",(req,res)=>{
	res.render("reg");
})

app.get("/",(req,res)=>{
	res.render("index");
})

// app.get("/user",(req,res)=>{
// 	res.render("user");
// })
// let serialNumber = 3;
let unid = 8;
// Generating post request to the server
app.post("/reg",async (req,res)=>{
	try{
		const pass = req.body.password;
		const cpass = req.body.password2
		const uid = unid++;
		if(pass === cpass){
			const user = new Register({
				username: req.body.username,
				password: pass,
				password2: cpass,
				uid: uid
			})
		const result = await user.save()
		res.status(201).redirect("login");
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



// app.get("/users", async (req,res)=>{
// 	try{
// 		if(!res.query){
// 			res.status(403).send("Permission denied!")
// 		} else {
// 			const mydat = await Register.findOne(req.query);
// 			res.status(200).render('user',{uname:mydat});
// 		}
// 	}catch(err){
// 		console.log(err);
// 	};
// })

app.get("/users", async (req, res) => {
    try {
        const query = req.query;

        // Check if query parameter is empty or undefined
        if (Object.keys(query).length === 0 && query.constructor === Object) {
            return res.status(400).send("Query parameter cannot be blank.");
        }

        const mydat = await Register.findOne(query);

        if (!mydat) {
            return res.status(404).send("User not found."); // Adjust error message as per your application's logic
        }

        res.status(200).render('user', { uname: mydat }); // Assuming 'user' is your EJS template
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});


// Running the server in the given port
app.listen(port, ()=>{
	console.log("Server is Running")
});