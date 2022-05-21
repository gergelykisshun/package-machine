const { Router } = require('express');
// const session = require('express-session');
const router = Router();
const { hashPassword } = require('../utils/helpers')
const passport = require('passport');

router.get('/users', (req, res) => {
  if(!req.user.role === 'manager') res.status(403).json({msg: 'Not authorized!'})
  User.find({}, (err, docs) => {
    if(err) res.status(400).json({msg: err});
    res.status(200).json({all: docs});
  });
});

router.get('/test', (req, res) => {
  res.send('React can communicate here')
});


 
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json({"username": req.user.username,
  "role": req.user.role,
  "isLoggedIn": true
  });
})

router.post('/register', async (req, res) => {
  console.log(req.body);

  const {username, email, password, role} = req.body;
  if(!username || !email || !password || !role) return res.status(400).send('input missing for registering');

  const userDB = await User.findOne({ $or: [{ username }, { email }] });

  if(userDB) return res.status(400).send(`User already exists!`)

  const hashed = hashPassword(password);
  User.create({ username, email, password: hashed, role })
  
  res.status(200).json({msg: 'Register is successful!'});

});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
      if(err) res.send(err)
      else res.json({msg: 'logout successful'})
    })
})

module.exports = router;