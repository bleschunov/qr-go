const express = require('express');
const path = require('path');
const fs = require('fs')
const https = require('https')
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

let isHttps = false
let key, cert
try {
    key = fs.readFileSync('/etc/letsencrypt/live/psy-forum-sno.ru/privkey.pem')
    cert = fs.readFileSync('/etc/letsencrypt/live/psy-forum-sno.ru/fullchain.pem')
    isHttps = true
} catch (error) {
    console.log(error)
}

let server = app
if (isHttps) {
    console.log('https')
    server = https.createServer({
        key,
        cert
    }, app)
}


server.listen(443, () => {
    console.log(`Server is listening on port 443`)
});