'use strict';
const express = require('express');
const app = express();
const router = express.Router();
const Joi = require('@hapi/joi');
const { addUser } = require('../modules/users/service/userServices');
const {joiFormatter , mongooseValidationFormator} = require('../helper/validationFormatter');
const { authValidation }=  require('../modules/users/validation/authValidation');
const { loginValidation }  =require('../modules/users/validation/loginValidation');

const authMiddleware = require('../app/middleware/authMiddleware');


const ADMIN_BASE_URL = '/admin';

/**Login Request**/
router.get(`${ADMIN_BASE_URL}/dashboard`,authMiddleware,(req , res)=>{
    return res.render('admin/index')
});

router.get(`${ADMIN_BASE_URL}/categories`,authMiddleware,(req , res)=>{
    return res.render('admin/category/list')
});






module.exports = router;