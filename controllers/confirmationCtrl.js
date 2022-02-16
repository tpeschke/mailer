const sendMailCtrl = require('./sendMailCtrl');
const { urlBase } = require("../server-config.js");
const path = require('path')

confirmation = {
    sendConfirmationEmail: (req, res) => {
        let personsEmail = req.body.email
        ,   db = req.app.get('db')

        db.get.checkForEmail(personsEmail).then(emails => {
            if (emails.length > 0) {
                res.send({message:"duplicate email"})
             } else {
                var today = new Date().toISOString();
                db.add.toConfirmation(personsEmail, today).then(_ => {
                    sendMailCtrl.sendEmail(personsEmail, 'Bonfire Mailing List Confirmation', confirmation.createConfirmationBody(personsEmail))
                    res.send({message:"good to go"})
                })
            }
        })
    },
    createConfirmationBody: (email) => {
        return `<h1>Confirmation Email</h1>
        <p>Just click on the button below to confirm that this is actually your email and that it actually works and you'll be good to go.</p>
        <a href='${urlBase}/confirmEmail/${email}' target='_blank'><button>Confirm</button></a>
        <br>
        <p>- Trent</p>`
    },
    confirmEmail: (req, res) => {
        let personsEmail = req.params.email
        ,   db = req.app.get('db')

        db.get.checkForEmailInConfirmation(personsEmail).then(emails => {
            if (emails.length > 0) {
                db.delete.fromConfirmationList(personsEmail).then(_ => {
                    db.add.toMailingList(personsEmail).then( _ => {
                        let welcomeEmailId = '4tpDXd1wURrCQk8nKsBCq4zzwBXunX63JR0fJWoaoBHbS2vCsF'
                        db.get.emailToSend(welcomeEmailId).then(email => {
                            let emailToSend = email[0]
                            sendMailCtrl.sendEmail(personsEmail, emailToSend.subject, emailToSend.body).then(_ => {
                                sendMailCtrl.sendEmailToMe('New Sign Up', 'Someone new signed up to the email list')
                                res.sendFile(path.join(__dirname + '/../webpage/confirmationPage.html'))
                            })
                        })
                    }).catch(e=>console.log(e))
                })
            }
        })
    },
    removeEmailsFromConfirmationTable: (db) => {
        db.delete.oldConfirmationEmails()
    }
}

module.exports = confirmation