const User = require("../model/user")

// save a user services ---------------------------
exports.createAuserService = async(data)=>{
    if(data){
        const userData = await User.findOne({email: {$eq: data.email}})
        console.log("userData",userData)
    
        if(userData){
            const result = "User is already created";
            return result
        }
        else{
            const result = await User.create(data)
            return result;
        }
    }
    else{
        res.status(400).json({
            message: "Please insert your info"
        })
    }
    }

    // login a user service--------------------------------
exports.loginAuserService = async(email)=>{
    const result = await User.findOne({email:email})
    return result;
}