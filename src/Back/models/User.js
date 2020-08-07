const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  userName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unigue: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  resetLink: {
    data: String,
    default: "",
  },
  
}, {timestamps: true})

const User = mongoose.model('User', userSchema)
module.exports = User

