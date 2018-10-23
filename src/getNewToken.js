const readline = require('readline')

module.exports = async function getNewToken(oAuth2Client) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    })

    console.log('Authorize this app by visiting this url:', authUrl)

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    return new Promise(resolve => rl.question('Enter the code from that page here: ', (code) => {
        rl.close()

        oAuth2Client.getToken(code, (err, token) => {
            if (err){
                console.error('Error while trying to retrieve access token', err)
                return
            }

            oAuth2Client.setCredentials(token)

            return resolve(token)
        })
    }))
}