const jwt = require('jsonwebtoken');
const {promisify}= require("util")

module.exports= async(req,res,next)=>{
    try {
        const token = req?.headers?.authorization?.split(" ")?.[1];
 //take token from request
        console.log(req?.headers?.authorization)
        console.log("token",token)
        if(!token){                                                //if not token exist
            res.status(200).json({
                status: 'Unauthorized',
                massage: "Please go for login",
            })
        }

        const decoded = await promisify(jwt.verify)(token, process.env.SECRET_TOKEN)

        req.user =decoded;
        next();

    } catch (error) {
        res.status(403).json({
            status: "fail",
            error: "Invalid token",
         });
    }
}