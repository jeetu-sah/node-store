const express = require('express');
const router = express.Router();
const { addUser } = require('../modules/users/service/userServices');
const { registerSchema } = require('../modules/users/validation/registerValidation');




/**
 * define route view file routes
 * **/
router.get('/register' , (req , res) => {
    res.render('register',{message:null})
});

router.post('/register' , async (req , res)=>{
    
    try {
        const user = await addUser(req.body);
        return res.render('register',{
                                    message:"Registration Successfully.",
                                    status:200 })
        
    } catch (error) {
        console.log(error)
        return res.render('register',{
                                    message:"Something went wrong, please try again." ,status:100})
    }
  
});

module.exports = router;