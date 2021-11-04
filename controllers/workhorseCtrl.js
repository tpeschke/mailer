const sendMailCtrl = require('./sendMailCtrl');

let errors = [];

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
                    workHorse.handleSendingEachEmail(mailingList, 0, db)
        })
    },
    handleSendingEachEmail: (mailingList, index, db) => {
        let person = mailingList[index]
        if (person && person.mailinglistbodyid !== 'waiting') { 
            db.get.emailToSend(person.mailinglistbodyid).then(email => {
                let emailToSend = email[0]
                if (emailToSend) {
                    sendMailCtrl.sendEmail(person.email, emailToSend.subject, emailToSend.body).then(result => {
                        if (result.accepted.length > 0) {
                            if (emailToSend.nextmailinglistbodyid) {
                                db.update.emailToSend(person.email, emailToSend.nextmailinglistbodyid).then(_ => {
                                    workHorse.handleSendingEachEmail(mailingList, ++index, db)
                                })
                            } else {
                                db.update.emailToSend(person.email, "waiting").then(_ => {
                                    errors.push(`${person.email} is about to reach the end of the prepared emails`)
                                    workHorse.handleSendingEachEmail(mailingList, ++index, db)
                                })
                            }
                        } else {
                            db.delete.fromMailingList(person.email).then(_ => {
                                errors.push(`Removed ${person.email} from mailing list`)
                                workHorse.handleSendingEachEmail(mailingList, ++index, db)
                            })
                        }
                    })
                } else {
                    errors.push(`Couldn't find an email to send to ${person.email}`)
                    workHorse.handleSendingEachEmail(mailingList, ++index, db)
                }           
            })
        } else if (person) {
            errors.push(`${person.email} has reached the end of the prepared emails`)
            workHorse.handleSendingEachEmail(mailingList, ++index, db)
        } else {
            let messageString = '<h1>All Emails Send Out</h1><p>here is a list of the errors that occured:</p><br>'
            errors.forEach(error => {
                messageString += `<p>* ${error}</p>`
            })
            sendMailCtrl.sendEmailToMe("Emails Sent Out", messageString)
        }
    }
}
module.exports = workHorse