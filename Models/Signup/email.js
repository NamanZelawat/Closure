var nodemailer = require("nodemailer");
var sgTransport = require("nodemailer-sendgrid-transport");
const dotenv = require("dotenv");
dotenv.config();

function email(emailid, otp) {
  return new Promise(function(resolve, reject) {
    var options = {
      auth: {
        api_user: process.env.API_USER,
        api_key: process.env.API_KEY
      }
    };

    var client = nodemailer.createTransport(sgTransport(options));

    var email = {
      from: process.env.EMAIL_ID,
      to: emailid,
      subject: "OTP",
      text: "Hello world",
      html: `<b>Your otp is ${otp}</b>`
    };

    client.sendMail(email, function(err, info) {
      if (err) {
        console.log(err);
        return reject({
          success: false,
          msg: "Mail was not sent"
        });
      } else {
        console.log("Message sent: " + info.response);
        return resolve({
          success: true,
          msg: "Mail was sent successfully"
        });
      }
    });
  });
}

module.exports = email;
