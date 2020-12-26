let express = require("express");
let app = express();
const bodyParser = require('body-parser');
let acc = require('./account.json');
acc = acc.accounts;

//setting up body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/getPost', function(req,res){
	let credential = JSON.stringify(req.body);
	credential = JSON.parse(credential);
	console.log(credential);
	console.log(acc);
	console.log(acc.length);
	let bol = false;
	for(var i=0;i<acc.length;i++){
		if((acc[i].username === credential.username) && (acc[i].password === credential.password)){
			console.log("succeded!")
			res.redirect('/home');
			bol = true;
			break;
		}
	}
	if(bol == false){
		res.redirect('/failed');
	}

})

//Route Express
app.use(express.static('public'));

app.get("/", function(req, res){
	res.render('login.ejs');
});
app.get("/retrieve", function(req, res){
	res.render('retrieve.ejs');
});
app.get("/home", function(req, res){
	res.render('home.ejs');
});
app.get("/failed", function(req, res){
	res.render('failed.ejs');
});



console.log('working!');
app.listen(3000);
