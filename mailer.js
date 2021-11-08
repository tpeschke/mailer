const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , massive = require('massive')
    , { server, databaseCredentials, validAuthString } = require('./server-config')
    , path = require('path')
    , workHorse = require('./controllers/workhorseCtrl')
    , confirmation = require('./controllers/confirmationCtrl')

const app = new express()
app.use(bodyParser.json())
app.use(cors())

// ================================== \\

app.post('/addEmail', confirmation.sendConfirmationEmail)
app.get('/confirmEmail/:email', confirmation.confirmEmail)

app.get('/unsubscribe/:email', (req, res) => {
    let db = req.app.get('db')
    db.delete.fromMailingList(req.params.email).then(_ => {
        res.sendFile(path.join(__dirname + '/webpage/unsubscribe.html'))
    })
})

app.get('/webpage/assets/:file', (req, res) => {
    res.sendFile(path.join(__dirname + '/webpage/assets/' + req.params.file))
})
app.get('/webpage/:file', (req, res) => {
    res.sendFile(path.join(__dirname + '/webpage/' + req.params.file))
})

function checkIp(req, res, next) {
    if(validAuthString === req.params.authString) {
        next();
    } else{
        res.sendFile(path.join(__dirname + '/webpage/index.html'))
    }
}

app.get('/editor/:authString', checkIp, (req, res) => {
    res.sendFile(path.join(__dirname + '/webpage/editor.html'))
})
app.post('/addNewEmail', workHorse.saveNewEmail)

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/webpage/index.html'))
})
// ================================== \\
massive(databaseCredentials).then(dbI => {
    app.set('db', dbI)
    app.listen(server, _ => {
        console.log(`I scream into the void but I only hear myself call back ${server}`)
        var CronJob = require('cron').CronJob;
        var job = new CronJob('0 0 0 */21 * *', function () {
            workHorse.sendOutEmails(app.get('db'))
            confirmation.removeEmailsFromConfirmationTable(app.get('db'))
        }, null, true, 'America/Los_Angeles');
        job.start();
    })
}).catch(e => console.log(e))