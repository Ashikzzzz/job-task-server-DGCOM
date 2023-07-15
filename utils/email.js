const nodeMailer = require("nodemailer")
const {google} = require("googleapis")

const oAuth2client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
)
oAuth2client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})

module.exports.sendMailWithGmail = async (data)=>{
    const accessToken = await oAuth2client.getAccessToken()


    
}