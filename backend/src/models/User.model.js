const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // User fields
});

module.exports = mongoose.model('User', UserSchema);
