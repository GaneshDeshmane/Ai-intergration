function authMiddleware(req,res,next){
    const token = req.headers.authorization
    if(!token){
        res.status(401).json('token is not found')
        return
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.userId = decoded.id
        next() 
        if(!decoded){
            res.status(401).json('invalid token')
            return
        }
    }catch(err){
        res.status(401).json('unauthorized')
    }
}
module.exports = { authMiddleware : authMiddleware }