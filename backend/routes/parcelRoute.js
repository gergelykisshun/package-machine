const { Router } = require('express');
const router = Router();
const Machine = require('../database/schemas/packageMachine');
const { hashPassword, checkHashedPassword } = require('../utils/helpers')


router.post('/machine-data', (req, res) => {
  Machine.findById(req.body.id, (err, doc) => {
    if(err) res.status(400).json({msg: err});
    res.status(200).json({data: doc});
  });
});


router.post('/drop-off', async (req, res) => {
  // console.log(req.body);
  let { newParcelArray } = req.body.data;
  const { size, parcelID } = req.body.data.parcelToUpdate;

  if(!req.body.data.password){
    newParcelArray = newParcelArray.map(parcel => {
      if(parcel._id === parcelID){
        return {...parcel, password: hashPassword(parcel.password)}
      } else {
        return parcel
      }
    });
  } else {
    const parcelPass = newParcelArray.find(parcel => parcel._id === parcelID).password;
    // console.log(newParcelArray);
    // console.log(parcelID);
    console.log(parcelPass);
    console.log(req.body.data.password);
    if(!checkHashedPassword(req.body.data.password, parcelPass)){
      return res.status(403).json({err: 'Wrong password!'})
    } else {
      console.log('checked pass and passed')
      newParcelArray = newParcelArray.map(parcel => ({...parcel, empty: true, password: ''}));
    }
  }

  Machine.findByIdAndUpdate( req.body.id, { [`${size}Parcels`]: newParcelArray}, {new: true}, (err, doc) => {
    if(err) res.status(400).json({err: err})
    res.status(200).json({success: doc})
  });
});


module.exports = router;
