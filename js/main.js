var socket = io();

var username = localStorage.getItem("username");

console.log(username, typeof username);
if (!username) {
	$('.modal-user').modal('show');
}

$('#entername').click(function () {
	var enteredname = $('#user').val();

	username = enteredname;

	localStorage.setItem("username", enteredname);

	$('.modal-user').modal('hide');
});

$('#btn-send').click(function () {

	var message = $('#msg').val();

	socket.emit('msg', {
		msg: message,
		name: username
	});

	$('#msg').val('');
});

socket.on('chat', function (res) {
	$('.msg-box').append('<p><span class="nick">'+ res.name + '</span>: ' + res.msg + '</p>');
});