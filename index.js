// const fetch = require('node-fetch')
const axios = require('axios').default
const config = require('./config.js')
const productionKey = config.PRODUCTION_API_KEY
const sandboxKey = config.SANDBOX_API_KEY

let csv = require('fast-csv')
const fs = require('fs')

const headerConfig = {
    headers: {
        'Content-Type': 'application/xml'

    }
}

var stream = fs.createReadStream("data.csv");

csv
    .parseStream(stream, { headers: true })
    .on("data", function (data) {
        //  console.log(data.MMSID);

        axios.get(`https://api-na.hosted.exlibrisgroup.com/almaws/v1/bibs/${data.MMSID}/holdings/${data.HoldingId}?apikey=${sandboxKey}`)
            .then(res => {

                const xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><holding><holding_id>${res.data.holding_id}</holding_id><created_by>${res.data.created_by}</created_by><created_date>${res.data.created_date}</created_date><last_modified_by>${res.data.last_modified_by}</last_modified_by><last_modified_date>${res.data.last_modified_date}</last_modified_date><originating_system>${res.data.originating_system}</originating_system><originating_system_id>${res.data.originating_system_id}</originating_system_id><suppress_from_publishing>${res.data.suppress_from_publishing}</suppress_from_publishing><calculated_suppress_from_publishing>${res.data.calculated_suppress_from_publishing}</calculated_suppress_from_publishing>${res.data.anies.toString().replace(/\n/gm, "").replace(/(<subfield code="h">)(.+?)(<\/subfield>)/, `$1${data.Classification}$3`).replace(/<\?xml version.+?>/gm, "")}</holding>`

                axios.put(`https://api-na.hosted.exlibrisgroup.com/almaws/v1/bibs/${data.MMSID}/holdings/${data.HoldingId}?apikey=${sandboxKey}`, xml, headerConfig)
                    .then(res => {
                        console.log(res)
                    })
                    .catch(error => {
                        console.log(error)
                    })

            }).catch(error => {
                console.log(error)
            })

    })
    .on("end", function () {
        console.log("done")
    });

