const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const ejs = require('ejs');
const request = require('request');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//database connection
require('./database/db_config.js');


//inlcude route file
const authRoutes = require('./routes/authRoutes');

app.use('/',authRoutes);

//include model files
//const User = require('./models/Users');

//Css and JS file configure 
const staticPath = path.join(__dirname , 'public');
//add this path for customize css and js file for include.
app.use(express.static(staticPath));
// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: true }))


//const dataBasePath = path.join(__dirname , 'database');

app.set('view engine','ejs');
app.get('/' , function(req , res){
    res.render('index')
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



app.listen(8000 ,    ()=>{
    console.log("Service working")
});
