const { Router } = require('express');
const router = Router();
const Machine = require('../database/schemas/packageMachine');
const Courier = require('../database/schemas/courier');
const { hashPassword } = require('../utils/helpers');
const { nanoid } = require('nanoid');



router.post('/new-machine', (req, res) => {
  console.log(req.body)

  const parcelCreator = (numOfP, tag) => {
    return new Array(parseInt(numOfP)).fill('0').map(el => {
      return {
        password: '',
        name: `${tag}-${nanoid().slice(0, 4)}`,
        empty: true
      }
    });
  };

  try {
    const {aParcels, bParcels, cParcels} = req.body;
    Machine.create({aParcels: parcelCreator(aParcels, 'a'), bParcels: parcelCreator(bParcels, 'b'), cParcels: parcelCreator(cParcels, 'c')}, (err, doc) => {
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
