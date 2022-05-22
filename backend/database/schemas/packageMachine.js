const mongoose = require('mongoose');

const packageMachineSchema = new mongoose.Schema({
  aParcels: {
    type: [
      {
        password: String,
        name: mongoose.SchemaTypes.Mixed,
        empty: Boolean
      }
    ]
  },
  bParcels: {
    type: [
      {
        password: String,
        name: mongoose.SchemaTypes.Mixed,
        empty: Boolean
      }
    ]
  },
  cParcels: {
    type: [
      {
        password: String,
        name: mongoose.SchemaTypes.Mixed,
        empty: Boolean
      }
    ]
  }
})

module.exports = mongoose.model('packageMachine', packageMachineSchema);