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
const {parentCategory} = require('../../helper/siteHelper')
var ObjectId = require('mongoose').Types.ObjectId; 
const mongoose = require('mongoose');

/**
 * Save category response
 * **/
router.post('/',  (req , res)=>{
    try {
        //return console.log(formData);
        const saveCategoryresponse =  addCategory(req.body);
        return res.send(saveCategoryresponse);
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


//parent category of products
router.get('/parentCategory',async (req , res) =>{
    try{
        console.log("parent category wellcome");
        const categories = await CategoryModel.find({"parent_category": null}).lean();
        categories.forEach(category => {
            const childCategory = CategoryModel.aggregate({"$match": {"parent_category": category._id}})
                                          
             console.log(childCategory);
            //const userObjectId = new mongoose.Types.ObjectId(category._id);
            //const childCat = CategoryModel.find({ parent_category:userObjectId}).lean();
          
        });
     
     
    }catch(error){
        console.log(error);
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