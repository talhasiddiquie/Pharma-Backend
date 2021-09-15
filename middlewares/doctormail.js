const nodemailer = require("nodemailer");

require('dotenv').config();

const username = process.env.email;
const password = process.env.password;
const host = process.env.host;
const smtp_port = process.env.EMAIL_PORT;
const FRONT_END_URL = process.env.FRONT_END_URL

// async..await is not allowed in global scope, must use a wrapper
module.exports = async function main(data) {
    console.log(data, 'data of user email data');
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        pool: true,
        name: username,
        host: host,
        port: smtp_port,
        connectionTimeout: 60000,
        greetingTimeout: 30000,
        secure: false, // true for 465, false for other ports
        auth: {
            user: username, // generated ethereal user
            pass: password, // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let html_data = `
    <h2>Welcome to Pharmaceutical Community!</h2>
    <p>Dear ${data.name},</p>
    <p>Below is your Email & Meeting ID.</p>
    <p>Email:${data.email}</p>
    <p>Meeting ID:${data.meetingId}</p>
    <p>Click the link below and add the email and id,</p>
    <p>${FRONT_END_URL}/doctor-initiate</p>
    
    <h4>Sincerely,</h4>
    <h3>Team Pharmaceutical<h3>
    `;

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Pharmaceutical_no_reply" <' + username + '>', // sender address
        to: data.email, // list of receivers
        subject: "Email & Password from Pharmaceutical", // Subject line
        text: "Here is your email & password for Pharmaceutical dashboard", // plain text body
        html: html_data // html body
    });
    // console.log('email data', info)
    
    console.log("Message sent: %s", info);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}


