const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "talhathetester@gmail.com",
    pass: "qwertykey786",
  },
});

const forgotPasswordThroughNodeMailer = (body) => {
  console.log(body, "<=========");
  const message =
    "<p>Your Verification Code is " +
    body.token +
    ". Kindly do not disclose your Verification Code to others for your own security. If you didnt request a password change then kindly ignore this message.</p> ";

  const data = {
    from: "talhathetester@gmail.com",
    to: body.email,
    subject: "Account Verification at Pharma",
    html: message,
  };
  console.log(message);

  transporter.sendMail(data, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
module.exports = { forgotPasswordThroughNodeMailer };
