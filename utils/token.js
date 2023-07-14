const jwt = require('jsonwebtoken');

exports.generateToken=(userInfo)=>{
const payload = {
    email : userInfo.email,
    
}
console.log(payload)

const token = jwt.sign(payload,process.env.SECRET_TOKEN,{
    expiresIn : "7d"
})
return token

}