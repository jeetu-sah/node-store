const joiFormatter = (error) =>{
    
    const validationErrorObj = {}; 
    const details = error.details;
   
    details.map(function(arr, index){
        validationErrorObj[arr.path] = arr.message;
    })
    return validationErrorObj;
}


const mongooseValidationFormator = (rawError)=>{
   const mongooseError = {};
   const errorDetail = rawError.errors;
   for(const key in errorDetail){
        mongooseError[key] = [errorDetail[key].message];
   }
   return mongooseError;
}

module.exports = {joiFormatter , mongooseValidationFormator};