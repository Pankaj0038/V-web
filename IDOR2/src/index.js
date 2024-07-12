// Load express JS
const express = require("express");
const app = express();




const path = require("path")

const port = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const stat_path = path.join(__dirname, "../public")
const temp_path = path.join(__dirname, "../templates/views")
app.use(express.static(stat_path));
app.set("view engine", "hbs");
app.set("views", temp_path);
app.get("/login", (req, res) => {
	res.render("login");
});
app.get("/reg", (req, res) => {
	res.render("reg");
})

app.get("/", (req, res) => {
	res.render("index");
})

const credRoute = require("../routes/api");
app.use("/api", credRoute);

app.post("/reg", (req, res) => {
	const user = req.body;
	var resClone;
	fetch('http://localhost:3000/api/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(user)
	})
		.then(response => response.json())
		.then(data => {
			console.log(data.val)
			if(data.val && data.val.val==="success"){
				res.redirect("./login")
			} else {
				res.render("error",{message:data.val})
			}
		})
		.catch((error) => {
			console.error('Error:', error);
		});
})


const url = "http://localhost:3000/api/users?username="
app.post("/login", (req, res) => {
	const cred = req.body.username;
	const pass = req.body.password;
	console.log(cred);
	const myurl = url + cred
	fetch(myurl, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(response => response.json())
		.then(data => {
			if (data.password == pass) {
				res.status(200).render("user", { uname: data })
			}
			else {
				res.send("password wrong")
			}
		})

});

const swaggerDocs = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const options = {
	definition: {
		openapi: "3.1.0",
		info: {
			title: "Vulnweb",
			version: "1.0.0"
		},
		servers: [
			{
				url: "http://localhost:3000/"
			}
		]
	},
	apis: ["./routes/api.js"]
}

const swaggerSpec = swaggerDocs(options)
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec))




// Running the server in the given port
app.listen(port, () => {
	console.log("Server is Running")
});