var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', { useMongoClient: true });

var Messages = require('./models/messages');

app.use('/dist', express.static('node_modules'));
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

require('./routes/routes.js')(app);

io.on('connection', function(socket){

    var date = new Date();
    var time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    var dateformat = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();

    Messages.find({}, function (err, docs) {
      io.emit('history', docs);
    });

  	socket.on('msg', function (msg) {
      
      var msgs = msg.msg.toLowerCase();
      console.log(msgs);
      console.log(msgs.search('script'));
      if (msgs.search('script') == -1) {

        var newSpending = new Messages({
          'username': msg.username,
          'msg': msg.msg,
          'date': time + ' ' + dateformat
        });
          
        newSpending.save();

        msg.date = time + ' ' + dateformat;
    		
        io.emit('chat', msg);

      }

  	});

  	socket.on('disconnect', function(){
    	console.log('user disconnected', socket.id);
  	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});