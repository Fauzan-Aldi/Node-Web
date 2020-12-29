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
app.use(express.static(__dirname));
app.set('views', __dirname);
app.get("/", function(req, res){
	res.render(__dirname + '/views/login.ejs');
});
app.get("/retrieve", function(req, res){
	res.render(__dirname + '/views/retrieve.ejs');
});
app.get("/home", function(req, res){
	res.render(__dirname + '/home.ejs');
});
app.get("/failed", function(req, res){
	res.render(__dirname + '/views/failed.ejs');
});

//Chat App using soket.io
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = {};
var usernames = [];

io.on('connection', function(socket){
	//if there is new user
	socket.broadcast.emit('newMessage','someone is Connected!');
	
	//if there is one register
	socket.on('registerUser', function(username){
		if(usernames.indexOf(username) != -1){
			socket.emit('registerRespond', false);
		}else {
			users[socket.id] = username;
			usernames.push(username);
			socket.emit('registerRespond', true);
			console.log(users);
			console.log('---------');
			console.log(username);
			io.emit('addOnlineUser', usernames);
		}
	})
	//if there is new message
	socket.on('newMessage', function(msg){
		io.emit('newMessage', msg);
		console.log('Chat baru: ' + msg);

	});

	//
	socket.on('newTyping', function(msg){
		io.emit('newTyping', msg);
	})
	
	//if someone disconect
	socket.on('disconnect', function(msg){
		socket.broadcast.emit('newMessage','someone is Disonnected!');

		var index = usernames.indexOf(users[socket.id]);
		usernames.splice(index, 1);
		
		delete users[socket.id];

		io.emit('addOnlineUser', usernames)
	});
})





http.listen(3000, function(req, res){
	console.log('Running on port 3000')
});
