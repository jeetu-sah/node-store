const guestMiddleware = (req, res, next)=>{
     (!req.isAuthenticated()) 
        return next();

    return res.redirect('/');
}
module.exports = guestMiddleware;