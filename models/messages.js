var mongoose = require('mongoose');

var messagesScheme = mongoose.Schema({
    id: Number,
    username: String,
    msg: String,
    date: String
});

module.exports = mongoose.model('Messages', messagesScheme);