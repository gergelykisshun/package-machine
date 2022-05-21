const mongoose = require('mongoose');

const packageMachineSchema = new mongoose.Schema({
  aParcels: {
    type: [
      {
        password: String,
        empty: Boolean
      }
    ]
  },
  bParcels: {
    type: [
      {
        password: String,
        empty: Boolean
      }
    ]
  },
  cParcels: {
    type: [
      {
        password: String,
        empty: Boolean
      }
    ]
  }
})

module.exports = mongoose.model('packageMachine', packageMachineSchema);