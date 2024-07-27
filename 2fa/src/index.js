const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const hbs = require('hbs')
const static_path = path.join(__dirname,"../public");
const vpath = path.join(__dirname,"../templates/views");
app.use(express.static(static_path))
app.set("view engine","hbs");
app.set("views", vpath);
const User = require("./models/reg");
require("./db/connect");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const cors = require('cors');
app.use(cors());

app.get("/",(req,res)=>{
	res.redirect("index.html");
})

app.get('/logout',(req,res)=>{
	res.redirect('/');
})

const crypto = require('crypto');
const format = require('biguint-format');
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");
app.use(cookieParser());

function randomNumber(){
	const x = crypto.randomBytes(2);
	let num = format(x,'dec');
	while (num < 10000 || num >99999)
		if (num < 10000){
			num = num*10;
		} else {
			num = Math.floor(num/10);
		}
	return num.toString();
}



app.post("/register",async (req,res)=>{
	const email= req.body.email;
	const uname = req.body.username;
	const passwd= req.body.password;
	try{
		const user = new User({
			email: email,
			username: uname,
			password: passwd
		})
		const test1= await User.findOne({email});
		const test2 = await User.findOne({username:uname});
		if(test1 || test2 ){
			const error = {
				'error':'User already exist'
			};
			res.render('error',{error:error});
		} else {
			const result = await user.save();
			res.status(301).redirect("/");
		}
	}catch(err){
		console.log(err);
	}
})

app.post("/login",async (req,res)=>{
	const uname = req.body.username;
	const passwd= req.body.password;
	let saltRounds = 10;
	try{
		let data = await User.findOne({username:uname});
		if(passwd == data.password){
			let val = randomNumber();
			otp = {
				otp:val
			};
			console.log(val);
			let hashNum = await bcrypt.hash(val,saltRounds);
			res.clearCookie(`${uname}`)
			res.cookie(`${uname}`,hashNum);
			if (uname === "Admin"){
				const mess = {
					otp:"Unauthorized user"
				}
				res.render("otp",{data,val:mess});
			} else {
				res.render("otp",{data:data,val:otp});
			}
			
		} else {
			const error = {
				'error':'Username or password not matched'
			};
			res.render('error',{error:error});
		}
	}catch(err){
		console.log(err);
	}
		
})

app.post("/otp",async (req,res)=>{
	let otp = req.body.otp;
	let uname = req.body.uname;
	let cOTP = req.cookies[`${uname}`];
	console.log(uname);
	console.log(cOTP);
	let hashOtp = await bcrypt.compare(otp,cOTP);
	const data = await User.findOne({username:uname});
	if (hashOtp){
		let url = `/user/${data._id}`
		res.redirect(url);
	} else {
		const error = {
			'error':"Wrong OTP"
		};
		res.clearCookie(uname);
		res.render('error',{error:error});
	}
})

app.get('/user/:userId',async (req,res)=>{
	const uid = req.params.userId;
	const data = await User.findOne({_id:uid});
	res.render('user',{data:data});
})

app.get("*", (req,res)=>{
	const error = {
		'error':"404 : Page not found"
	};
	res.status(404).render('error',{error:error});
})

app.listen(port,()=>{
	console.log(`Listning to localhost:${port}`)
})