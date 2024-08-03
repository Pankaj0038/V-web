const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 4000;
const spath = path.join(__dirname,"../public");
const User = require("./models/reg");
require("./db/connect");
const hbs = require("hbs");
const vpath = path.join(__dirname,"../templates/views");

app.set("view engine","hbs");
app.set("views", vpath);
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(spath));


function b64(originalString){
	let bufferObj = Buffer.from(originalString, "utf8"); 
	let base64String = bufferObj.toString("base64"); 
	return base64String;
}

function b64d(base64String){
	const decodedString = Buffer.from(base64String, 'base64').toString('utf-8');
	return decodedString;
}

app.get("/", (req,res)=>{
	res.redirect("index.html")
})
app.get("/login", (req,res)=>{
	res.redirect("/login.html");
})
app.get("/register", (req,res)=>{
	res.redirect("register.html");
})
app.get("/members",(req,res)=>{
	res.redirect("members.html")
})
app.get("/about",(req,res)=>{
	res.redirect("about.html")
})

app.get("/user/:id",async(req,res)=>{
	const uid = req.params.id;
	const data = await User.findOne({_id:uid});
	console.log(data);
	res.render('user',{data});
})
app.get("/logout",(req,res)=>{
	res.clearCookie("user");
	res.redirect("/");
})

app.post('/login',async (req,res)=>{
	const uname = req.body.username;
	const passwd = req.body.password;
	const user = await User.findOne({username:uname});
	if(user && user.password === passwd){
		let value = b64(JSON.stringify(user))
		res.clearCookie("user");
		res.cookie("user",value);
		res.redirect("/");
	} else{
		const error = {
			"message" : "Username or password wrong"
		}
		res.render("error",{error})
	}
})
app.post("/register",async(req,res)=>{
	const uname = req.body.username;
	const email = req.body.email;
	const passwd = req.body.password;
	const uex = await User.findOne({$or: [{username:uname},{email:email}]})
	if(uex){
		console.log("user exists");
	} else{
		const user = new User({
			email: email,
			username: uname,
			password: passwd
		});
		const result = await user.save();
		res.status(302).redirect("/login");
	}
	
})

app.post('/alert',async (req,res)=>{
	const mess={
		"flag":"Fl4g{Cr055_s173_scr1p7}"
	}
	res.send(mess)
})

app.get("*",(req,res)=>{
	let error={
		"message":"Page not found"
	}
	res.status(404).render("error",{error})
})


app.listen(port, ()=>{
	console.log(`Listening on 127.0.0.1:${port}`);
})