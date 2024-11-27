const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  accountNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  age:{
	  type:Number,
	  required:true,
	  default:18,
  },
});

module.exports = mongoose.model('Account', AccountSchema);
