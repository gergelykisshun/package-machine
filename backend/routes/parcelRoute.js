const { Router } = require('express');
const router = Router();
const Machine = require('../database/schemas/packageMachine');
const { hashPassword } = require('../utils/helpers')


router.post('/machine-data', (req, res) => {
  Machine.findById(req.body.id, (err, doc) => {
    if(err) res.status(400).json({msg: err});
    res.status(200).json({data: doc});
  });
});

router.post('/drop-off', async (req, res) => {
  let { newParcelArray } = req.body.data;
  const { size, parcelID } = req.body.data.parcelToUpdate;

  newParcelArray = newParcelArray.map(parcel => {
    if(parcel._id === parcelID){
      return {...parcel, password: hashPassword(parcel.password)}
    } else {
      return parcel
    }
  });

  Machine.findByIdAndUpdate( req.body.id, { [`${size}Parcels`]: newParcelArray}, {new: true}, (err, doc) => {
    if(err) res.status(400).json({fail: err})
    res.status(200).json({success: doc})
  });
});


router.post('/pick-up', async (req, res) => {
  
});

module.exports = router;
