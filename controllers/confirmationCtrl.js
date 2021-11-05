const sendMailCtrl = require('./sendMailCtrl');
const { urlBase } = require("../server-config.js");

confirmation = {
    sendConfirmationEmail: (req, res) => {
        let personsEmail = req.body.email
        ,   db = req.app.get('db')

        db.get.checkForEmail(personsEmail).then(emails => {
            if (emails.length > 0) {
                // do something, I guess
                console.log('Duplicate Email')
            } else {
                // add to emailconfirmationtable
                // with date
                sendMailCtrl.sendEmail(personsEmail, 'Bonfire Mailing List Confirmation', confirmation.createConfirmationBody(personsEmail))
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
        let personsEmail = req.body.email
        ,   db = req.app.get('db')

        db.get.checkForEmail(personsEmail).then(emails => {
            if (emails.length > 0) {
                // remove from confirmation table
                let welcomeEmailId = '4tpDXd1wURrCQk8nKsBCq4zzwBXunX63JR0fJWoaoBHbS2vCsF'
                , secondEmailId = 'El1ckxpr5S2IEK35ylpnQGct9FijE7HzlNLhudyko3YgpC1kb1'
                // add to mailinglist table
                // send welcome email
            }
        })
    },
    removeEmailsFromConfirmationTable: () => {

    }
}

module.exports = confirmation