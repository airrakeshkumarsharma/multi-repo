const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  text: String
});

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;