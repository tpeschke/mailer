module.exports = {
    getEmails: (req, res) => {
        let db = req.app.get('db')
        db.get.emails().then(emails => res.send(emails))
    },
    getEmail: (req, res) => {
        let id = req.params.id
        let db = req.app.get('db')

        db.get.email(id).then(email => res.send(email))
    },
    updateEmail: (req, res) => {
        let {subject, body, mailinglistbodyid} = req.body
        let db = req.app.get('db')

        db.update.email(subject, body, mailinglistbodyid).then(respon => {
            res.send([{message: 'updated'}])
        })
    }
}