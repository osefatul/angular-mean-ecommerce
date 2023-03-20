const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
  token: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

exports.Token = mongoose.model('SuccessToken', tokenSchema);
