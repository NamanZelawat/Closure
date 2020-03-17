const nodemailer = require("nodemailer");

function email(email, otp) {
  return new Promise(function(resolve, reject) {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "namanzelawat@gmail.com",
        pass: "nimeshzelawat27082000"
      }
    });

    let mailOptions = {
      from: '"Chatter" <namanzelawat@gmail.com>',
      to: `${email}`,
      subject: "OTP verification",
      text: "Welcome to chatter",
      html: `<h1 style='align-text:center;'>Welcome to chatter</h1><br>
                    <h3>Your otp is ${otp} please verify to activate your account`
    };

    transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
        console.log("error in mail");
        return reject({
          success: false,
          msg: "Mail was not sent"
        });
      } else {
        console.log("mail succesfully sent");
        return resolve({
          success: true,
          msg: "Mail was sent successfully"
        });
      }
    });
  });
}

module.exports = email;
