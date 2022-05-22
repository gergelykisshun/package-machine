const passport = require('passport');
const { Strategy } = require('passport-local');
const Courier = require('../database/schemas/courier');
const {checkHashedPassword} = require('../utils/helpers');



passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((_id, done) => {
  //fix
  Courier.findById( _id, (err, user) => {
    if(err){
        done(null, false, {error:err});
    } else {
      done(null, user);
    }
  });
});

passport.use(
  new Strategy({
    usernameField: 'name'
  }, async (name, password, done) => {
    try {
      if (!name || !password){
        throw new Error('Bad request');
      }
      //
      const courier = await Courier.findOne({name: name});
      if(!courier) throw new Error('user not found');
      if(checkHashedPassword(password, courier.password)){
        done(null, courier);
      } else {
        done(null, null);
      }
    } catch(err){
      done(err, null);
    }
  })
);