const express = require('express');
const app = express();
const router = express.Router();
const Joi = require('@hapi/joi');
const { addUser } = require('../modules/users/service/userServices');
const {joiFormatter , mongooseValidationFormator} = require('../helper/validationFormatter');
const { authValidation }=  require('../modules/users/validation/authValidation');
const { loginValidation }  =require('../modules/users/validation/loginValidation');
const passport = require('passport');
const authMiddleware = require('../app/middleware/authMiddleware');
const guestMiddleware = require('../app/middleware/guestMiddleeare');
const bcrypt = require("bcrypt");




/**Login Request**/
router.get('/login',guestMiddleware,(req , res)=>{
    return res.render('login')
});

/**
 * 
 * 
 * Login Post Request**/
router.post('/login', guestMiddleware ,(req , res , next)=>{
    passport.authenticate('local', (err , user , info)=>{
        
        const loginValidationResult = loginValidation.validate(req.body ,{ abortEarly :false});    
        
        if(loginValidationResult.error){
            //return validation
            req.session.validationError = {
                                        message:"Please fill all required fields.",
                                        status:300,
                                        errors:joiFormatter(loginValidationResult.error),
                                        formData:req.body
                                    }
            return res.redirect('/login');
        }
     
        if(err){
            return res.redirect('/login');
        }
        if(user){
            //match password
            const validPassword =  bcrypt.compareSync(req.body.password, user.password);
            if(validPassword == true){
                //if password does matched
                req.logIn(user , (err) => {
                    if(err){
                        req.session.validationError = {
                                    message:"Something went wrong, please try again.",
                                    status:300,
                                    errors:{},
                                    formData:req.body
                                }
                    }

                    //login successful
                      req.session.validationError = {
                                    message:"Login successfully.",
                                    status:200,
                                    errors:{},
                                    formData:{}
                                }
                    return res.redirect('/admin/dashboard');
                });

            }else{
                req.session.validationError = {
                                        message:"Password does not matched.",
                                        status:300,
                                        errors:{},
                                        formData:req.body
                                    }
                return res.redirect('/login');
            }
        }else{
            req.session.validationError = {
                                    message:"User not found.",
                                    status:300,
                                    errors:{},
                                    formData:req.body
                                }
            return res.redirect('/login');
        }
       
    })(req , res , next)
});


/**
 * define route view file routes
 * **/
router.get('/register' ,guestMiddleware ,(req , res) => {
    res.render('register');
});

router.post('/register',guestMiddleware, async (req , res)=>{
    const formData = req.body;
    try {
        //form validation start and end
        const validationResult = authValidation.validate(req.body ,{ abortEarly :false});
        if(validationResult.error){
            //return validation
            req.session.validationError = {
                                        message:"Please fill all required fields.",
                                        status:300,
                                        errors:joiFormatter(validationResult.error),
                                        formData:formData
                                    }
            return res.redirect('register');
        }
        req.session.validationError  = {
                                            message:"Registration Successfully.",
                                            status:200,
                                            formData:{},
                                            errors:{}
                                        }
        console.log( req.session.validationError)
        const user = await addUser(req.body);
        return res.redirect('register');
        
    } catch (error) {
        const validationError =  mongooseValidationFormator(error);
        
        return res.render('register',{
                                    message:"Something went wrong, please try again." ,status:100,
                                    validationErrorResponse:validationError,
                                    formData:formData
                                })
    }
  
});

router.get('/logout',authMiddleware , (req , res)=>{
    req.logOut();
    res.redirect('/login');
});

module.exports = router;