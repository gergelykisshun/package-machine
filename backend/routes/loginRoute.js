const { Router } = require('express');
const router = Router();
const passport = require('passport');



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