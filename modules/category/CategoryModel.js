//https://www.codegrepper.com/code-examples/javascript/mongoose+data+type+integer
const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:[true , 'Category Name is required'],
        minlenght:[2 , 'Category name must be greater than from 2 character.'],
        maxlenght:[15 , 'Category name must be greater than from 15 character.']
    },
    slug_name:{
        type:String,
        required:[true,'Category Slug is required'],
    },
    parent_category:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    seo_description:{
        type:String,
        required:[true , 'Description is required'],
        maxlenght:[300 , 'Description must be greater than from 300 character.'],
        minlenght:[100 , 'Description must be minimum from from 100 character.'],
    },
    description:{
        type:String,
        required:[true , 'Description is required'],
    },
},
{ timestamps: true }
);

const Category = mongoose.model('categories',categorySchema);
module.exports = Category;


