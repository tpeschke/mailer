const sendMailCtrl = require('./sendMailCtrl');

let errors = [];
function makeid() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 50; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

let workHorse = {
    sendOutEmails: (db) => {
        errors = []
        db.get.mailingList().then(mailingList => {
            // check for unique emails
            // if yes
            // take first one off top
            // iterate through mailing list
            // send to each person
            // delete email from table
            // if no
            workHorse.handleSendingEachEmail(mailingList, 0, db, errors)
        })
    },
    handleSendingEachEmail: (mailingList, index, db, errors) => {
        let person = mailingList[index]
        if (person && person.mailinglistbodyid !== 'waiting') {
            db.get.emailToSend(person.mailinglistbodyid).then(email => {
                let emailToSend = email[0]
                if (emailToSend && emailToSend.subject && emailToSend.body) {
                    sendMailCtrl.sendEmail(person.email, emailToSend.subject, emailToSend.body).then(result => {
                        if (result.accepted.length > 0) {
                            if (emailToSend.nextmailinglistbodyid) {
                                db.update.emailToSend(person.email, emailToSend.nextmailinglistbodyid).then(_ => {
                                    workHorse.handleSendingEachEmail(mailingList, ++index, db, errors)
                                })
                            } else {
                                db.update.emailToSend(person.email, "waiting").then(_ => {
                                    errors.push(`${person.email} is about to reach the end of the prepared emails`)
                                    workHorse.handleSendingEachEmail(mailingList, ++index, db, errors)
                                })
                            }
                        } else {
                            db.delete.fromMailingList(person.email).then(_ => {
                                errors.push(`Removed ${person.email} from mailing list`)
                                workHorse.handleSendingEachEmail(mailingList, ++index, db, errors)
                            })
                        }
                    })
                } else {
                    errors.push(`Couldn't find an email to send to ${person.email}`)
                    workHorse.handleSendingEachEmail(mailingList, ++index, db, errors)
                }
            })
        } else if (person) {
            errors.push(`${person.email} has reached the end of the prepared emails`)
            workHorse.handleSendingEachEmail(mailingList, ++index, db, errors)
        } else {
            db.get.mailingListCount().then(response => {
                let count = response[0].count
                let messageString = `<h1>All Emails Send Out</h1><p>${count} People on the list</p><br/><p>here is a list of the errors that occured:</p><br>`
                errors.forEach(error => {
                    messageString += `<p>* ${error}</p>`
                })
                sendMailCtrl.sendEmailToMe("Emails Sent Out", messageString)
            })
        }
    },
    saveNewEmail: (req, res) => {
        let newEmail = req.body
            , db = req.app.get('db')

        newEmail.body += '<br><p>- Trent</p>'

        let newId = makeid();
        db.update.nextmailinglistbodyid(newId).then(_ => {
            db.add.newEmail(newId, newEmail.subject, newEmail.body).then(_ => {
                sendMailCtrl.sendEmailToMeWithTemplating(newEmail.subject, newEmail.body)
                res.send({ message: 'successful' })
            })
        })
    },
    sendEmailImmediately: (req, res) => {
        let email = req.body
            , db = req.app.get('db')

        errors = []
        email.body += '<br><p>- Trent</p>'

        db.get.mailingList().then(mailingList => {
            workHorse.handleSendingEachEmailImmediately(mailingList, 0, email, errors)
        })
    },
    handleSendingEachEmailImmediately: (mailingList, index, emailToSend, errors) => {
        let person = mailingList[index]
        if (person) {
            sendMailCtrl.sendEmail(person.email, emailToSend.subject, emailToSend.body).then(_ => {
                workHorse.handleSendingEachEmailImmediately(mailingList, ++index, emailToSend, errors)
            })
        } else {
            let messageString = `<h1>All Emails Send Out</h1><p>${mailingList.length} People on the list</p><br/><p>here is a list of the errors that occured:</p><br>`
            errors.forEach(error => {
                messageString += `<p>* ${error}</p>`
            })
            sendMailCtrl.sendEmailToMe("The Email Was Sent Out", messageString)
        }
    },
    sendSpecificEmail: (req, res) => {
        let { emailId } = req.params
            , db = req.app.get('db')

        db.get.emailToSend(emailId).then(email => {
            email = email[0]
            sendMailCtrl.sendEmailToMeWithTemplating(email.subject, email.body)
            res.send({ message: "sent" })
        })
    }
}
module.exports = workHorse