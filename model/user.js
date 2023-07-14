const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

// user model 

const User = mongoose.model("User",userSchema)


module.exports = User;
