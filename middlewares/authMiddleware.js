function authMiddleware(req,res,next){
    const jwt = require('jsonwebtoken')
    const dotenv = require('dotenv')
    dotenv.config()
    const JWT_USER_SECRET = process.env.JWT_USER_SECRET

    const token = req.headers.authorization
    if(!token){
        res.status(401).json('token is not found')
        return
    }
    try{

        const decoded = jwt.verify(token,JWT_USER_SECRET)
               if(!decoded){
            res.status(401).json('invalid token')
            return
        }
        req.userId = decoded.id
      

        next()       
   
    }catch(err){
        res.status(401).json('unauthorized')
    }
}
module.exports = { authMiddleware : authMiddleware }