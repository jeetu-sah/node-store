const flashMessageMiddleware = (req , res , next) => {
    console.log("Working")
    if(req.session.validationError){
        for(const key in req.session.validationError){
            res.locals.validationError[key] = req.session.validationError[key];
            console.log(res.locals[key]);
        }
        //req.session.validationError = null;
    }
    next()
}
module.exports = flashMessageMiddleware;