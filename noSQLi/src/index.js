const express = require('express');
const app = express();
const path = require("path");
const hbs = require("hbs");
const { MongoClient } = require('mongodb');
const stPath = path.join(__dirname,"../public");
const vPath = path.join(__dirname,"../templates/views");
const port = process.env.PORT || 3000;

const uri = 'mongodb://0.0.0.0:27017';
const client = new MongoClient(uri);

async function logIn(uname, pass) {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('creds'); 
    const collection = database.collection('logins'); 

    const data = await collection.findOne({ 
    	$where: `this.username=="${uname}" && this.password=="${pass}"` });
    return data;
  } catch (err) {
    console.error('Error in login query:', err);
    throw err;
  } finally {
    await client.close(); 
    console.log('Disconnected from MongoDB');
  }
}


app.use(express.static(stPath));
app.set("view engine","hbs");
app.set("views", vPath);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.render("index.html");
});

app.get('/login', (req, res) => {
  res.render("login");
});

app.get('/user', (req, res) => {
  res.render("user");
});



app.post("/login", async (req, res) => {
  const uname = req.body.username;
  const pass = req.body.password;
  console.log(uname);
  console.log(pass);
  let mess= {message:`#Error: User not found $where: this.username=="${uname}" && this.password=="${pass}"`}
  try {
    const data = await logIn(uname, pass); 
    if(data){
    	res.render('user', { data: data });
    } else {
    	res.render('404',{mess})
    }
  } catch (err) {
    console.error('Error in POST /login:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('*',(req,res)=>{
	const mess = {message:"page not found"}
	res.render('404',{mess})
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
