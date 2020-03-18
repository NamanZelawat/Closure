var nodemailer = require("nodemailer");
var sgTransport = require("nodemailer-sendgrid-transport");

function email(emailid, otp) {
  return new Promise(function(resolve, reject) {
    var options = {
      auth: {
        api_user: "Zelawat",
        api_key: "se#3dDz9n%VL#r7"
      }
    };

    var client = nodemailer.createTransport(sgTransport(options));

    var email = {
      from: "nisarjha@gmail.com",
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
