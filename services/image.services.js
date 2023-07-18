const Image = require("../model/image")


    // login a user service--------------------------------
    exports.getImageServices = async()=>{
        const result = await User.find({})
        return result;
    }