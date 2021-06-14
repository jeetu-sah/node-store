const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../modules/users/models/Users');


passport.use(new LocalStrategy({
        usernameField: 'email',
    },
    async (email, password, done) => {
        try{
            const user = await User.findOne({ email} , (err, user)=>{
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                // if the user is properly authenticated
                 return done(null, user);
            });
        }   catch (e){
            return done(e);
        } 
  }
));


passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    console.log(id)
    User.findById(id, function(err, user) {
        done(err, user);
    });
});