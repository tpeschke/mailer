const nodemailer = require("nodemailer");
const { client, secret, email: myEmail, accessToken, refreshToken, password } = require("../server-config.js");
const { getHeader, getFooter, getTestContent } = require('../controllers/htmlTemplate');

sendMailClient = {
    sendEmail: async (email, subject, body) => {
        return new Promise(resolve => {
            nodemailer.createTestAccount((err, account) => {
                let transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: myEmail,
                        pass: password
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });

                let mailOptions = {
                    from: `Trent Peschke <${myEmail}>`,
                    to: email,
                    subject: subject,
                    html: getHeader() + body + getFooter(email)
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
    sendEmailToMeWithTemplating: async (subject, body) => {
        sendMailClient.sendEmailToMe(subject, getHeader() + body + getFooter(''))
    },
    sendEmailToMe: async (subject, body) => {
        return new Promise(resolve => {
            nodemailer.createTestAccount((err, account) => {
                let transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: myEmail,
                        pass: password
                    },
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

module.exports = sendMailClient