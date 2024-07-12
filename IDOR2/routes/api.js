const express = require("express");
const router = express.Router();
const User = require("../src/models/reg");
require("../src/db/conn")
/** 
 * @swagger 
 * /:
 *   get: 
 *     description: Get index page of the website
 *     responses:  
 *       200: 
 *         description: Success  
 *   
 */

/** 
 * @swagger 
 * /api/users:
 *   get:
 *     tags:
 *       - User 
 *     description: Get user data
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *            type: string
 *         required: true
 *     responses:  
 *       200: 
 *         description: Success  
 *   
 */



router.post("/users", async (req, res) => {
	try {
		let val;
		const { email, username, password, password2 } = req.body;
		if (password === password2) {
			const user = new User({
				email: email,
				username: username,
				password: password,
				password2: password2,
			})
			const test = await User.findOne({email:email})
			console.log(test)
			if(test && Object.keys(test).length!=0){
				val = JSON.stringify(test.uid)
				console.log(val)
				res.json({val})
			}else{
				const result = await user.save()
				const val = ({val:"success"})
				res.json({val})
				
			}
			
		} else {
			res.status(404).send('password not match')
		}
	} catch (err) {
		res.status(502).send(err);
		console.log(err)
	}
});




router.get("/users", async (req, res) => {
	try {
		const query = req.query;
		if (Object.keys(query).length === 0 && query.constructor === Object) {
			return res.status(400).send("Query parameter cannot be blank.");
		}
		const dat = await User.findOne(query);
		if (!dat) {
			res.send({"message":"user not found"});
		}
		res.send(dat);
	} catch (err) {
		console.log(err);
	}
})

module.exports = router;