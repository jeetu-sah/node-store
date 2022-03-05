require('dotenv').config();
const express = require('express');
var logger = require('morgan')
const bodyParser = require("body-parser");
const path = require('path');
const ejs = require('ejs');
// using your local EJS version
const request = require('request');
const mongoose = require('mongoose');
const passport = require('passport');
const Vue = require('vue');
const axios = require('axios');
require('./helper/authStrategies/localStrategies');
const app = express();
const authMiddleware = require('./app/middleware/authMiddleware');
//import config file
const config = require('./config/config');


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
//database connection
require('./database/db_config.js');
const mongoDbConnection = require('./database/db_config');
const session = require('express-session');
//const MongoStore = require('connect-mongo');
const MongoStore = require('connect-mongo');

const { Mongoose } = require('mongoose');
app.engine('ejs', require('express-ejs-extend')); // add this line

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
  resave: true,
  saveUninitialized: false,
  rolling: true,
  cookie: { secure: false },
  //cookie: { maxAge: 60 * 60 * 1000 },
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost/node_practice' })
}))
//passport initialize
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'))
//initialize local variable
//flash message initialize
//define global variable for all view
app.locals.errors = {};
app.locals.validationError = {
                              message:null,
                              status:null,
                              errors:{},
                              formData:{}
                            }

app.use( (req , res , next) =>{  
  res.locals.user = req.isAuthenticated ? req.user : null;
  app.locals.sessionMessage = req.session.flashData;
  //set variable when set data on variable
  if(req.session.validationError){
     app.locals.validationError = req.session.validationError;
  }
  delete req.session.validationError;
  delete req.session.flashData;
  next()
})



//inlcude route file
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const siteRoutes = require('./routes/siteRoutes');
//api routes start
const categoryApiRoutes = require('./routes/api/categoryRoute');
const productApiRoutes = require('./routes/api/productRoute');
app.use('/',authRoutes);
app.use('/',adminRoutes);
app.use('/',siteRoutes);
app.use('/api/v1/category',categoryApiRoutes);
app.use('/api/v1/product/',productApiRoutes);



app.get('/', function(req , res){
  return res.render('front/index')
});

app.use(function (req, res, next) {
  res.status(404).render('404');
})

app.listen(config.port , ()=>{
  console.log(`Server running on port ${config.port}`);
});
