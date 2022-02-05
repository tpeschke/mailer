const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , massive = require('massive')
    , { server, databaseCredentials, validAuthString } = require('./server-config')
    , path = require('path')
    , workHorse = require('./controllers/workhorseCtrl')
    , confirmation = require('./controllers/confirmationCtrl')

const app = new express()
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
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

app.get('/sendSpecificEmail/:emailId', workHorse.sendSpecificEmail)

app.get('/remainingTime', (req, res) => res.send({intervalLeft}))

app.get('/webpage/assets/:file', (req, res) => {
    res.sendFile(path.join(__dirname + '/webpage/assets/' + req.params.file))
})
app.get('/webpage/:file', (req, res) => {
    res.sendFile(path.join(__dirname + '/webpage/' + req.params.file))
})

app.get('/iframe', (req, res) => {
    res.sendFile(path.join(__dirname + '/webpage/iframe.html'))
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

let interval = 1814400000
// let interval = 604800000
let intervalLeft = interval
massive(databaseCredentials).then(dbI => {
    app.set('db', dbI)
    app.listen(server, _ => {
        console.log(`I scream into the void but I only hear myself call back ${server}`)

        setInterval(() => {
            workHorse.sendOutEmails(app.get('db'))
            confirmation.removeEmailsFromConfirmationTable(app.get('db'))
            intervalLeft = interval
        }, interval)
        setInterval(() => {
            intervalLeft -= 1000
        }, 1000)
    })
}).catch(e => console.log(e))