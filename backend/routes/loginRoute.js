const { Router } = require('express');
// const session = require('express-session');
const router = Router();
const { hashPassword } = require('../utils/helpers')
const passport = require('passport');

// router.get('/users', (req, res) => {
//   if(!req.user.role === 'manager') res.status(403).json({msg: 'Not authorized!'})
//   User.find({}, (err, docs) => {
//     if(err) res.status(400).json({msg: err});
//     res.status(200).json({all: docs});
//   });
// });



 
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json({"name": req.user.name,
  "success": true,
  "isLoggedIn": true
  });
})



router.get('/logout', (req, res) => {
    req.session.destroy(err => {
      if(err) res.send(err)
      else res.json({success: 'logout successful'})
    })
})

module.exports = router;