const User = require("../model/user")

// save a user services ---------------------------
exports.createAuserService = async(data)=>{
    if(data){
        const userData = await User.findOne({email: {$eq: data.email}})
        console.log("userData",userData)
    
        if(!userData){
            
            const result = await User.create(data)
            return result;
        }
        else{
            const result = "User is already created";
            return result
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

// user persistance
exports.findUserByEmail = async (email) => {
    return await User.findOne({ email });
 };

 // user confirmation gmail services-------------
exports.confirmationGmailServices = async (token) => {
    return await User.findOne({ confirmationToken:token });
 };