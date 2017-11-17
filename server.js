var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/dist', express.static('node_modules'));
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){


  	console.log('a user connected', socket.id);

  	socket.on('msg', function (msg) {
  		console.log(msg);
  		io.emit('chat', msg);
  	});

  	socket.on('disconnect', function(){
    	console.log('user disconnected', socket.id);
  	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});