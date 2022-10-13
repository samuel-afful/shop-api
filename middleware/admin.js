
verifyAdmin = function(req,res,next){

    if(!req.user.isAdmin) return res.status(403).send('Access Denied, Not Admin');
    next();
}

module.exports = {verifyAdmin}