const {google} = require('googleapis')

module.exports = async function listMajors(oAuth2Client) {
    const sheets = google.sheets({version: 'v4', oAuth2Client})

    sheets.spreadsheets.values.get({
        spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
        range: 'Class Data!A2:E'
    }, (err, res) => {
        if (err) {
            console.log('The API returned an error: ' + err)
            return
        }
        const rows = res.data.values

        if (rows.length) {
            console.log('Name, Major:')
            // Print columns A and E, which correspond to indices 0 and 4.
            rows.map((row) => {
                console.log(`${row[0]}, ${row[4]}`)
            })
        } else {
            console.log('No data found.')
        }
    })
}