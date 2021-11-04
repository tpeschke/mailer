const nodemailer = require("nodemailer");
const {email, lock} = require("../server-config.js");
const {getHeader, getFooter, getTestContent} = require('../controllers/htmlTemplate');

module.exports = {
    sendTest: (req, res) => {
        nodemailer.createTestAccount((err, account) => {
            let transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: email,
                    pass: lock
                }
            });

            let mailOptions = {
                from: `Trent Peschke <${email}>`, 
                to: email,
                subject: 'Test Email', 
                html:getHeader() + getTestContent() + getFooter()
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
            });
        })
    }
}