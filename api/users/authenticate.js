module.exports = {
    authenticate: (req, res, next) => {
        if(req.isAuthenticated()) {
            return next();
        }
        res.status(401).json({message: 'Unauthorized'})
    },
    authAdmin: (req, res, next) => {
        if(req.isAuthenticated() && req.user.admin) {
            return next();
        }
        res.status(401).json({message: 'Unauthorized'})
    }
}