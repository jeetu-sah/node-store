const express = require('express');
var logger = require('morgan')
const bodyParser = require("body-parser");
const path = require('path');
const ejs = require('ejs');
const request = require('request');
const mongoose = require('mongoose');
const passport = require('passport');
require('./helper/authStrategies/localStrategies');
const app = express();
const authMiddleware = require('./app/middleware/authMiddleware');


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
//database connection
require('./database/db_config.js');
const mongoDbConnection = require('./database/db_config');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { Mongoose } = require('mongoose');



//include model files
const User = require('./modules/users/models/Users');

//Css and JS file configure 
const staticPath = path.join(__dirname , 'public');
//add this path for customize css and js file for include.
app.use(express.static(staticPath));
// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: true }))


//const dataBasePath = path.join(__dirname , 'database');
app.set('view engine','ejs');
//setup session
//app.set('trust proxy', 1) 
app.use(session({
  secret: '93d6232e078ed9ed0a2004f4e64b36d77e55d188',
  resave: false,
  saveUninitialized: true,
  //cookie: { secure: false },
  cookie: { maxAge: 60 * 60 * 1000 },
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost/node_practice' })
}))
//passport initialize
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'))
//initialize local variable
//flash message initialize
app.locals.errors = {};
app.locals.validationError = {  status:null,
                                errors:{},
                                formData:{}
                              }

app.use( (req , res , next) =>{
  app.locals.sessionMessage = req.session.flashData;
  app.locals.validationError = req.session.validationError;
 

  delete req.session.flashData;
  next()
})



//inlcude route file
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
app.use('/',authRoutes);
app.use('/',adminRoutes);



app.get('/', authMiddleware, function(req , res){
  //console.log('User:',req.user);
  //req.session.view = (req.session.view || 0) + 1;
  //console.log('view',req.session.view);
  return res.redirect('/admin/dashboard')
});
// app.get('/register' , function(req , res){
//     res.render('register',{message:null})
// });

// app.post('/register' , async function(req , res){
//     //res.send('register form submit');
//     const user = new User(req.body);
//     // generate salt to hash password
//     const salt = await bcrypt.genSalt(10);
//     // now we set user password to hashed password
//     user.password = await bcrypt.hash(user.password, salt);
//     await user.save().then( 
//         () =>{
//             res.render('register', {message:"Registration Successfully."})
//         }
//     ).catch( 
//         (error) =>{
//             res.send(error);
//         }
//     );
//     // req.flash('success', 'Thanks for the message! I‘ll be in touch :)');
//     //res.send(user);
// });

app.use(function (req, res, next) {
  res.status(404).render('404');
})

app.listen(8000 ,    ()=>{
    console.log("Service working")
});
