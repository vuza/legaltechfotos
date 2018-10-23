const {google} = require('googleapis')
const getNewToken = require('./getNewToken')
const listSomething = require('./listSomething')
const config = require('config')

let token

const {client_secret, client_id, redirect_uris} = config.get('credentials')
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

if(!token) {
    token = await getNewToken(oAuth2Client)
}

oAuth2Client.setCredentials(JSON.parse(token))

await listSomething(oAuth2Client)