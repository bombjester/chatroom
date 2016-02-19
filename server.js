var express = require("express");
var path = require("path");
var app = express();


var messages= [];
app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req,res){

	res.render('index', {dataz: messages});
})

var server = app.listen(8000, function(){
	console.log("litening on 8000");

})



var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
	console.log("Socket connected!");
	console.log(socket.id);


	socket.on('new message', function (dataz){
		var obj ={};
		obj.name = dataz['users'];
		obj.message =dataz['post'][0]['value'];
		messages.push(obj);
		console.log(messages);
		socket.emit('messages', {boxes: messages});
	});





});