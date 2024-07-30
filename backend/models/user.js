const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: toString},
    amount: { type: Number}
});

module.exports = mongoose.model('users', UserSchema);
