const nodemailer = require("nodemailer");

var smtpConfig = {
    service: "Gmail",
    auth: {
        user: 'noreplydummy125@gmail.com',
        pass: 'kqswulhtckzdcdna',
    },
};
  

const  generateEmail = async (email, subject, html) => {
    
    try {
        const transporter = nodemailer.createTransport(smtpConfig);
        const mailOptions = {
        from: 'hasnainalihrhr@gmail.com',
        to: email,
        subject,
        text: "hiiii",
        html,
        };
        const res = await transporter.sendMail(mailOptions);
        console.log(res);
        return ["res", true];
    } catch (err) {
        console.log("err in sending email: ", err);
        return ["ERR", true];
    }
}

module.exports = { 
    generateEmail 
};