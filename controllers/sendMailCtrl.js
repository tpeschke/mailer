const nodemailer = require("nodemailer");
const { client, secret, email: myEmail, accessToken, refreshToken } = require("../server-config.js");
const { getHeader, getFooter, getTestContent } = require('../controllers/htmlTemplate');

module.exports = {
    sendEmail: async (email, subject, body) => {
        return new Promise(resolve => {
            nodemailer.createTestAccount((err, account) => {
                let transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        type: "OAuth2",
                        user: myEmail,
                        clientId: client,
                        clientSecret: secret,
                        accessToken,
                        refreshToken
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
    sendEmailToMe: async (subject, body) => {
        return new Promise(resolve => {
            nodemailer.createTestAccount((err, account) => {
                let transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        type: "OAuth2",
                        clientId: client,
                        clientSecret: secret
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