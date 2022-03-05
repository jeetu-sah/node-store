 const CategoryModel = require('../modules/category/CategoryModel');

const parentCategory = (category) =>{
    console.log(category.length)
    
    const productCategory = [];
    category.forEach(element => {
        const childCategoryRecord = CategoryModel.find({"parent_category" : '60dcd94f30437201e09ab157'}).lean();
        console.log(childCategoryRecord)
        //productCategory.push({category_name:element.name});
        //const child = childCategory(element);
        //console.log(child);
    });
   
}

const  childCategory = (parentCategory)=>{
    //find child category
    console.log("childCategoryRecord childCategoryRecord childCategoryRecord");
    //const childCategoryRecord = CategoryModel.find({parent_category:ObjectId('60e767ecfcb9281dc048173c')});
    const childCategoryRecord = CategoryModel.find({parent_category : '60dcd94f30437201e09ab157'}).lean();
    return childCategoryRecord;
}

module.exports = {parentCategory};