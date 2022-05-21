const passport = require('passport');
const { Strategy } = require('passport-local');
 const Machine = require('../database/schemas/packageMachine');
const {checkHashedPassword} = require('../utils/helpers');

// passport.serializeUser((user, done) => {
//   // console.log('serializing user');
//   // console.log(user);
//   done(null, user.id);
//   })

// passport.deserializeUser(async (u, done) => {
//   console.log('deserialize')
//   // console.log(id);
//   try{
//     const user = User.findById(u.id);
//     if(!user) throw new Error('no user found')
//     console.log(user.username)
//     done(null, user);
//   } catch(err){
//     done(err, null);
//   }
// })

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((_id, done) => {
  //fix
  Machine.findById( _id, (err, user) => {
    if(err){
        done(null, false, {error:err});
    } else {
      done(null, user);
    }
  });
});

passport.use(
  new Strategy({
    usernameField: 'username'
  }, async (username, password, done) => {
    try {
      if (!username || !password){
        throw new Error('Bad request');
      }
      //
      const user = await Machine.findOne({username});
      if(!user) throw new Error('user not found');
      if(checkHashedPassword(password, user.password)){
        done(null, user);
      } else {
        done(null, null);
      }
    } catch(err){
      done(err, null);
    }
  })
);