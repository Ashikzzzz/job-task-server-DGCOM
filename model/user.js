const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require("crypto") 

// user schema 

const userSchema = new mongoose.Schema({
 
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required: true,
        unique : [true,"Email already exists"]
    },
    password : {
        type : String,
        required: true
    },

   isVerified:{
    type: Boolean,
    default: false
   }
   
    
},
{
    timestamps: true,
}
)

// check password is hashed 

userSchema.pre("save",function(next){
    const password = this.password
    const hashedPassword = bcrypt.hashSync(password)
    this.password =hashedPassword
    next()

})


// compare a password for login 

userSchema.methods.comparePassword = (password, hash)=>{
    const isPasswordValid = bcrypt.compareSync(password,hash)
    return isPasswordValid
}


// user model 

const User = mongoose.model("User",userSchema)


module.exports = User;
