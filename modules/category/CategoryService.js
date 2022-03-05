const CategoryModel = require('./CategoryModel');
var slugify = require('slugify')


/***
 * 
 * Save products category
 * 
 * **/

const addCategory = async (categoryInput)=>{
    categoryInput.slug_name = slugify(categoryInput.name, {
                                    replacement: '-',
                                    lower: true,
                                    remove: undefined,
                                    remove: /[*+~.()'"!:@]/g});
                                    
    const category = new CategoryModel(categoryInput);
    await category.save();
    return category;
}

module.exports = { addCategory }


