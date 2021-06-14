'use strict';
const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const { addUser } = require('../modules/users/service/userServices');
const {joiFormatter , mongooseValidationFormator} = require('../helper/validationFormatter');
const { authValidation }=  require('../modules/users/validation/authValidation');
const passport = require('passport');
const authMiddleware = require('../app/middleware/authMiddleware');
const guestMiddleware = require('../app/middleware/guestMiddleeare');



/**Login Request**/
router.get('/login',guestMiddleware,(req , res)=>{
    return res.render('login',{
                            status:200,
                            error:{},
                            formData:req.body
                        })
});

/**
 * 
 * 
 * Login Post Request**/
router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login',}),
    (req , res) =>  {
        return res.redirect('/');
});


/**
 * define route view file routes
 * **/
router.get('/register' , (req , res) => {
    res.render('register',{
                            status:200,
                            error:{},
                            formData:req.body
                        })
});

router.post('/register' , async (req , res)=>{
    const formData = req.body;
   
    //return res.send(req.body);
    try {
        //form validation start and end
        const validationResult = authValidation.validate(req.body ,{ abortEarly :false});
        if(validationResult.error){
            //return validation
            return res.render('register',{
                                status:300,
                                error:joiFormatter(validationResult.error),
                                formData:formData
                                })
        }
        
        
        const user = await addUser(req.body);
        return res.render('register',{
                                    message:"Registration Successfully.",
                                    status:200,
                                    validationErrorResponse:null,
                                    formData:formData,
                                    error:{}
                                 })
        
    } catch (error) {
        const validationError =  mongooseValidationFormator(error);
        return res.render('register',{
                                    message:"Something went wrong, please try again." ,status:100,
                                    validationErrorResponse:validationError,
                                    formData:formData
                                })
    }
  
});

module.exports = router;