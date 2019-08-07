const constants = require('../app-constants').APP_CONSTANTS;
const nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
    host: constants.SMTP_HOST,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: constants.SMTP_USER,
        pass: constants.SMTP_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

exports.addEmail = function (doc) {
    return new Promise(async function (resolve, reject) {
        try {
            let mailOptions = {
                from: constants.SMTP_FROM_EMAIL,
                to: doc.to,   //"bar@example.com, baz@example.com", // list of receivers
                subject: doc.subject,
                html: doc.emailBody
            };
            console.log("into email service");

            let info = await transporter.sendMail(mailOptions);
            resolve(info);
        }
        catch (ex) {
            console.log(ex);
            reject();
        }
    })
}