let express = require("express");
let app = express();
const bodyParser = require('body-parser');

//MongoDB Connecttion!
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0.zo6aj.mongodb.net/Daftar_Pegawai?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log("Succeeded!!");
  client.close();
});


//Route Express
app.use(express.static('public'));

app.get("/", function(req, res){
	res.render('top.ejs');
});

app.get("/remember", function(req,res){
	res.render('remember.ejs');
});
app.get("/test", function(req, res){
	res.redirect("/home");
})
app.get("/home", function(req, res){
	res.render('home.ejs');
})

//setting up body-parser
app.use(bodyParser.urlencoded({extended: true}))

app.post("/signup", function(req, res){
	ans = req.body
	console.log(ans);
	ans.
	res.redirect()
});



app.listen(3000);
