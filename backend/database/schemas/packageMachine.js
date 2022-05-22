const mongoose = require('mongoose');

const packageMachineSchema = new mongoose.Schema({
  aParcels: {
    type: [
      {
        password: String,
        name: String,
        empty: Boolean
      }
    ]
  },
  bParcels: {
    type: [
      {
        password: String,
        name: String,
        empty: Boolean
      }
    ]
  },
  cParcels: {
    type: [
      {
        password: String,
        name: String,
        empty: Boolean
      }
    ]
  }
})

module.exports = mongoose.model('packageMachine', packageMachineSchema);