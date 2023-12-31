const { createAuserService,loginAuserService ,findUserByEmail,confirmationGmailServices} = require("../services/user.services");
const { sendMailWithGmail } = require("../utils/email");
const { generateToken } = require("../utils/token");

// save a user controller-------------------------------
exports.createAuser = async(req, res)=>{
    try {
        const data = req.body;
        console.log("data",data)
       

        const result = await createAuserService(data)
        const token = result.generateConfirmGmailToken()

        await result.save({validateBeforeSave: false})
        // console.log("result",result)

            const mailData ={
                to: [data.email],
                subject: "verify your email",
                text:`Thank you for create your account. Please verify your gamil here:${process.env.BASE_URL}/api/v1/users/create-user/confirmation/${token}`
            }
            console.log("maildata",mailData)
            sendMailWithGmail(mailData)

        res.status(200).json({
            status: 'success',
            massage: "User inserted Successfully!",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            massage: "User inserted Error",
            error: error.message
        })
    }
}


// login a user controller --------------------------------
exports.loginAuser = async(req, res)=>{
    try {
        const {email,password}= req.body                     //take data from body

 console.log("password",password)
        if(!password || !email){                              //cheak user email and password exists
            res.status(200).json({
                status: 'failed',
                massage: "Please insert your email and password",
            })
        }


        const user = await loginAuserService(email)        // if user exists send db the email
console.log("user",user.password)

        if(!user){                                          // if not user exists send response
            res.status(200).json({
                status: 'failed',
                massage: "user doesn't exists",
             
       })
        }
        

        const isPasswordLegal= user.comparePassword( password, user.password)        //comparepassword

            console.log("isPasswordLegal",isPasswordLegal)

        if(!isPasswordLegal){                                         // if password is not valid pass
            res.status(200).json({
                status: 'failed',
                massage: "password is incorrect"
            })
        }

            
        if(user.status != "active"){                              // check user active or not
            res.status(200).json({
                status: 'failed',
                massage: "user is not active"
            })
        }

        const token = generateToken(user)                         // 8 . generate token

        const {password: pwd, ...others} = user.toObject()      // ignore send password to db when login

            // send response 

        
            res.status(200).json({
                status: 'success',
                massage: "user login Successfully!",
                data: {
                    others,
                    token
                       }
            })


    } catch (error) {
        res.status(400).json({
            status: 'error',
            massage: "User logged in Error",
            error: error.message
        })
    }
}


//  user persistance -------------------------------
exports.getMe = async(req, res)=>{
    try {
        console.log(req?.user?.email)
       let user= await findUserByEmail(req?.user?.email)
       console.log("user",user)
        res.status(200).json({
            status: 'success',
            data: user
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            error: error.message
        })
    }
}


//  confirmation gmail controller -------------------------------
exports.confirmEmail = async(req, res)=>{
    try {
        const {token} =  req.params

        const user = await confirmationGmailServices(token)

        if(!user){
            res.status(401).json({
                status: "fail",
                message: "invalid token"
            })
        }

        const expired= new Date() > new Date(user.confirmationTokenExpires)

        if(expired){
            res.status(401).json({
                status: "fail",
                messege: "token expired"
            })
        }

        user.status = "active";
        user.confirmationToken = undefined;
        user.confirmationTokenExpires = undefined;

        user.save({validateBeforeSave: false})

        res.status(200).json({
            status: 'success',
            message: "successfully activated your account"
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            error: error.message
        })
    }
}