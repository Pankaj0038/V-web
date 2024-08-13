const express = require("express");
const path = require('path');
const { v1: uuidv1 } = require('uuid');
const cookieParser = require('cookie-parser');
const hbs = require('hbs')
const app = express();
const port = 3000;
const stpath = path.join(__dirname, "../public");
app.use(express.static(stpath));


const cors = require('cors');
app.use(cors()); //enables all other website to forge request to this website



app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require("./db/conn");
const User = require("./models/data");
const vpath = path.join(__dirname,"../templates/views")
app.set("view engine","hbs");
app.set("views", vpath);

app.get("/", async (req, res) => {
    const session = req.cookies['sessionID']
    if (session) {
        console.log('Returning user');
    } else {
        const id = uuidv1();
        const user = new User({
        	uid: id
        })
        user.save()
        res.cookie('sessionID', id);
        console.log('New user', id);
    }
    const data = await User.findOne({uid:session});
    res.render("mypage",{data});
});

const url= 'http://localhost:3000/';

app.get('/send', async (req,res)=>{
	const uid = req.query.uid;
	const amount = req.query.amount;
	const cookie = req.cookies['sessionID'];
	const sender = await User.findOne({uid:cookie});
	const receiver = await User.findOne({uid:uid});
	if(receiver && sender){
		const sbal = sender.balance - parseInt(amount,10);
		const rbal = receiver.balance + parseInt(amount,10);
		console.log(rbal);

		const result = await User.updateOne({uid:cookie},{balance:sbal});
		const result2 = await User.updateOne({uid:uid},{balance:rbal});

		const referer = req.get('Referer') || req.get('referer');
		if(referer===url){
			res.send({'message':'Success'})
		} else {
			res.send({'message':'flag{cr0ss_s1t3_r3qu3st_f0rg3ry}'})
		}
	} else {
		res.send({'message':'Sender or Receiver not found'})
	}
	
	
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
