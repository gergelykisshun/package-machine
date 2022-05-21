const mongoose = require('mongoose');

const courierSchema = new mongoose.Schema({
  name: {
    type: mongoose.SchemaTypes.String, 
    unique: true,
    required: true
  },
  password: {
    type: mongoose.SchemaTypes.String,
    required: true
  }
})

module.exports = mongoose.model('courier', courierSchema);