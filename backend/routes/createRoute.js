const { Router } = require('express');
const router = Router();
const Machine = require('../database/schemas/packageMachine');
const Courier = require('../database/schemas/courier');
const { hashPassword } = require('../utils/helpers');



router.post('/new-machine', (req, res) => {
  console.log(req.body)

  const parcelBody = {
    password: '',
    empty: true
  };

  const parcelCreator = (numOfP) => {
    return new Array(parseInt(numOfP)).fill('0').map(el => parcelBody);
  };

  try {
    const {aParcels, bParcels, cParcels} = req.body;
    Machine.create({aParcels: parcelCreator(aParcels), bParcels: parcelCreator(bParcels), cParcels: parcelCreator(cParcels)}, (err, doc) => {
      if(err) return res.status(400).send(err);
      res.status(200).json({doc: doc});
    })
  } catch (err) {
    res.status(400).json({msg: err})
  }
});

router.post('/new-courier', async (req, res) => {
  console.log('hey')
  const {name, password} = req.body;
  if(!name || !password ) return res.status(400).json({err: `Input missing for register!`});

  const courierDB = await Courier.findOne({ name });
  if(courierDB) return res.status(400).json({err: `User already exists!`});

  const hashed = hashPassword(password);
  Courier.create({ name, password: hashed });

  res.status(200).json({msg: 'Registering new courier is successful!'});
});


module.exports = router;
