// const fetch = require('node-fetch')
const axios = require('axios').default;
const config = require('./config.js')
const productionKey = config.PRODUCTION_API_KEY;
const sandboxKey = config.SANDBOX_API_KEY;

// The bib record needs to be in MARC xml. You also need to wrap it in a <bib> tag and delete the header "<?xml version="1.0" encoding="UTF-16"?>"
// The XML sample at the bottom of the page here https://developers.exlibrisgroup.com/alma/apis/docs/xsd/rest_bib.xsd/?tags=PUT is the formatting to follow. The XML can be all on 1 line.

//Replace MARCXML_BIB_RECORD with the updated bib in MARCXML. You have to update the entire bib record while doing a PUT request.
let marc = 'MARCXML_BIB_RECORD'

// Replace MMS ID with the id from your system
let mmsid = '9953136504202441'

let holding_id = "22512378340002441"

let xmlRecord = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<holding>
    <holding_id>22512378340002441</holding_id>
    <created_by>import</created_by>
    <created_date>2015-07-09Z</created_date>
    <last_modified_by>exl_api</last_modified_by>
    <last_modified_date>2021-11-23Z</last_modified_date>
    <originating_system>ILS</originating_system>
    <originating_system_id>5593056-nwudb</originating_system_id>
    <suppress_from_publishing>false</suppress_from_publishing>
    <calculated_suppress_from_publishing>false</calculated_suppress_from_publishing>
    <record>
        <leader>00175cx  a22000854  4500</leader>
        <controlfield tag="001">5593056</controlfield>
        <controlfield tag="004">5313650</controlfield>
        <controlfield tag="005">20211123121118.0</controlfield>
        <controlfield tag="008">0903314u    8   1001uu   0901128</controlfield>
        <datafield ind1="0" ind2=" " tag="852">
            <subfield code="b">UNTD</subfield>
            <subfield code="c">ug</subfield>
            <subfield code="h">TEST</subfield>
            <subfield code="i">S4</subfield>
        </datafield>
    </record>
</holding>`


// console.log(marc)

var headerConfig = {
    headers: {
        'Content-Type': 'application/xml'

    }
};

let url = `https://api-na.hosted.exlibrisgroup.com/almaws/v1/bibs/${mmsid}/holdings/${holding_id}?apikey=${sandboxKey}`

// //Switch to the production key in your config.js file by changing sandboxKey to productionKey

axios.put(`https://api-na.hosted.exlibrisgroup.com/almaws/v1/bibs/${mmsid}/holdings/${holding_id}?apikey=${sandboxKey}`, xmlRecord, headerConfig)
    .then(res => {
        console.log(res)
    })
    .catch(error => {
        console.log(error)
    })





axios.get(url)
    .then(res => {

        // console.log(res.data.anies.toString().replace(/\n/g, ""))

        // let newRecord = res.data.anies.toString().replace(/\n|\t/g, "").replace(/>\s+</g, "><").replace(/(<subfield code=\"h\">)(BF432.N5)(<\/subfield>)/g, "$1BF432.B53$3")

        console.log(res.data.anies[0])

        // putRequest(newRecord)

    }).catch(error => {
        console.log(error)
    })