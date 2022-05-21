const { Router } = require('express');
const router = Router();
const Machine = require('../database/schemas/packageMachine');


router.post('/new-machine', (req, res) => {
  console.log(req.body)
  try {
    const {couriers, aParcels, bParcels, cParcels} = req.body;
    Machine.create({couriers, aParcels, bParcels, cParcels}, (err, doc) => {
      if(err) return res.status(400).send(err);
      res.status(200).json({doc: doc});
    })
  } catch (err) {
    res.status(400).json({msg: err})
  }
});




module.exports = router;
