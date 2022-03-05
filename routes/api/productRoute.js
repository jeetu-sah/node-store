'use strict';
const express = require('express');
const app = express();
const router = express.Router();
const Joi = require('@hapi/joi');
const { addCategory } = require('../../modules/category/CategoryService');
const {joiFormatter , mongooseValidationFormator} = require('../../helper/validationFormatter');
const { authValidation }=  require('../../modules/users/validation/authValidation');
const { loginValidation }  =require('../../modules/users/validation/loginValidation');
const authMiddleware = require('../../app/middleware/authMiddleware');
const CategoryController = require('../../app/controller/api/CategoryController')
const CategoryModel = require('../../modules/category/CategoryModel');
const datatablesQuery = require('datatables-query')


/**
 * Save category response
 * **/
router.post('/add-product',  (req , res)=>{
    try {
        res.send(res);
    }catch(error){
        res.send(error)
    }
   //console.log(req.data);
});

router.get('/list',async (req , res)=>{
    try{
        const categories = await CategoryModel.find().lean();
        return res.send(categories);
    }catch(error){
        console.log("Category list error");
    }
});

router.get('/category-list',async (req , res)=>{
    try{
      
        const start = Number(req.query.start);
        const limit = start + Number(req.query.length);
        const categories = await CategoryModel.find().skip(start).limit(limit);
       
      
        const categoryCount = await CategoryModel.countDocuments();
    

        const categoryJson = [];
        //create a new 
        categories.forEach(function(item, index,){
            categoryJson.push({_id: item._id,
                                name: item.name,
                                description: item.description,
                                seo_description: item.seo_description,
                                parent_category: item.parent_category,
                                slug_name:item.seo_description,
                                sn:index+1,
                                action:'delete',
                             })
        });
       
        //console.log(categoryJson);
        const categoryResponse =    {
                                        "draw": req.query.draw,
                                        "recordsTotal": Number(categoryCount),
                                        "recordsFiltered": Number(categoryCount),
                                        "data": categoryJson,
                                    };
        return res.send(categoryResponse);

    }catch(error){
        console.log("Category list error");
    }
});


module.exports = router;