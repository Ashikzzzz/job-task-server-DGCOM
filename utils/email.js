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

    let transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            type: "oAuth2",
            user: process.env.SENDER_MAIL,
            client_id : process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            refresh_token: process.env.REFRESH_TOKEN,
            accessToken: accessToken
        }
    })
    

    const mailData = {
        from: process.env.SENDER_MAIL,
        
    }
}