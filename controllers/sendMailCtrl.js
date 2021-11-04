const nodemailer = require("nodemailer");
const { email: myEmail, lock } = require("../server-config.js");
const { getHeader, getFooter, getTestContent } = require('../controllers/htmlTemplate');

module.exports = {
    sendEmail: async (email, subject, body) => {
        return new Promise(resolve => {
            nodemailer.createTestAccount((err, account) => {
                let transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: myEmail,
                        pass: lock
                    }
                });

                let mailOptions = {
                    from: `Trent Peschke <${myEmail}>`,
                    to: email,
                    subject: subject,
                    html: getHeader() + body + getFooter()
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    resolve(info)
                });
            })
        })
    },
    sendEmailToMe: async (subject, body) => {
        return new Promise(resolve => {
            nodemailer.createTestAccount((err, account) => {
                let transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: myEmail,
                        pass: lock
                    }
                });

                let mailOptions = {
                    from: `Trent Peschke <${myEmail}>`,
                    to: myEmail,
                    subject: subject,
                    html: body
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        resolve(error)
                    }
                    resolve(info)
                });
            })
        })
    }
}