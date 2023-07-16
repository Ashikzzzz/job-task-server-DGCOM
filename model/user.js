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

    status: {
        type: String,
        default: "inactive",
        enum: ["active","inactive"]
    },
   confirmationToken: String,
   confirmationTokenExpires: Date,
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

// generate token for email verification -------------
userSchema.methods.generateConfirmGmailToken =function (){
const token = crypto.randomBytes(64).toString("hex")

this.confirmationToken = token;
const date = new Date()
date.setDate(date.getDate()+1)

this.confirmationTokenExpires = date;

return token;

}


// user model 

const User = mongoose.model("User",userSchema)


module.exports = User;
