const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , massive = require('massive')
    , { server, databaseCredentials } = require('./server-config')
    , path = require('path')
    , workHorse = require('./controllers/workhorseCtrl')

const app = new express()
app.use(bodyParser.json())
app.use(cors())

// ================================== \\

app.get('/webpage/:file', (req, res) => {
    res.sendFile(path.join(__dirname + '/webpage/' + req.params.file))
})
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/webpage/index.html'))
})
// ================================== \\
massive(databaseCredentials).then(dbI => {
    app.set('db', dbI)
    app.listen(server, _ => {
        console.log(`I scream into the void but I only hear myself call back ${server}`)
        var CronJob = require('cron').CronJob;
        var job = new CronJob('0 0 0 * * *', function () {
            workHorse.sendOutEmails(app.get('db'))
        }, null, true, 'America/Los_Angeles');
        job.start();
    })
}).catch(e => console.log(e))