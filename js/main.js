var socket = io();

var username = localStorage.getItem("username");

function message (msg) {
	$('.msg-box').prepend('<p><span class="nick">'+ msg.username + '</span>: ' + msg.msg + '<span class="date-msg">' + msg.date + '</span></p>');
}

function send () {
	var message = $('#msg').val();

	socket.emit('msg', {
		msg: message,
		username: username
	});

	$('#msg').val('');
}


if (!username) {
	$('.modal-user').modal('show');
}

$('#entername').click(function () {
	var enteredname = $('#user').val();

	username = enteredname;

	localStorage.setItem("username", enteredname);

	$('.modal-user').modal('hide');
});

$('#msg').keypress(function (e) {
	if (e.keyCode == 13) {
		send();
	}
})

$('#btn-send').click(function () {
	send();
});



socket.on('chat', function (res) {
	console.log(res);
	message(res);
});

socket.on('history', function (messages) {
	$.each(messages, function (i, e) {
		console.log(e);
		message(e);
	});
});