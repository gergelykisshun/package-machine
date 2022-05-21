const mongoose = require('mongoose');

const packageMachineSchema = new mongoose.Schema({
  couriers: {
    type: [
      {
        name : String,
        password : String
      }
    ]
  },
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