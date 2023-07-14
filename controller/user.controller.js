const { createAuserService } = require("../services/user.services");

// save a user controller-------------------------------
exports.createAuser = async(req, res)=>{
    try {
        const data = req.body;
        console.log("data",data)
        const result = await createAuserService(data)
        console.log("result",result)
        res.status(200).json({
            status: 'success',
            massage: "User inserted Successfully!",
            signUpData: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            massage: "User inserted Error",
            error: error.message
        })
    }
}
