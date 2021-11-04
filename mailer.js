const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , massive = require('massive')
    , { server, databaseCredentials } = require('./server-config')
    , path = require('path')

const app = new express()
app.use(bodyParser.json())
app.use(cors())

// ================================== \\

app.get('/webpage/reset.css', (req, res) => {
    res.sendFile(path.join(__dirname + '/webpage/reset.css'))
})
app.get('/webpage/body.css', (req, res) => {
    res.sendFile(path.join(__dirname + '/webpage/body.css'))
})
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/webpage/index.html'))
})
// ================================== \\
massive(databaseCredentials).then(dbI => {
    app.set('db', dbI)
    app.listen(server, _ => {
        console.log(`I scream into the void but I only hear myself call back ${server}`)
    })
}).catch(e => console.log(e))