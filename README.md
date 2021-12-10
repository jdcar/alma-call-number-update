# Cutter number update for Alma [![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
## Table of Contents
* [Description](#description)
* [Installation Instructions](#installation-instructions)
* [License](#license)
* [Questions](#questions)
## Description
This is a script to update the cutter number (852 $h) in a set of holdings records using the Alma Retrieve Holdings Record and Update Holdings Record APIs https://developers.exlibrisgroup.com/alma/apis/docs/bibs/UFVUIC9hbG1hd3MvdjEvYmlicy97bW1zX2lkfS9ob2xkaW5ncy97aG9sZGluZ19pZH0=/.
This is built specifically for updating cutter numbers after the change Library of Congress made to certain n cutters: https://www.loc.gov/aba/pcc/saco/cpsoed/psd-210621.html 
## Installation Instructions
First, you will need an Alma API key with read/write permissions from your institution. In the alma-call-number-update main repo folder, create a 'config.js' file. Add this to the file with your API keys in quotes:
```
//The sandbox key is for testing, you will need to edit the index.js file to change SANDBOX_API_KEY to PRODUCTION_API_KEY when ready to update records.
module.exports = config = {
    PRODUCTION_API_KEY : 'ENTER_PRODUCTION_KEY_HERE',
    SANDBOX_API_KEY : 'ENTER_SANDBOX_KEY_HERE',
  }
  ```

Second, you'll need a csv of the new classification number*, the holdings ID and the MMSID. Add the csv file to the alma-call-number-update main repo folder and call it 'data.csv' using the format in 'example-data.csv.' Make sure the column headers match exactly. *Note: the file is csv, but the data in the file is tab delimited to simplify a copy-paste from a spreadsheet*

*The second column should be the new 852 subfield $h only.

When testing this on a file of 650 records I kept running into an error where I was making too many API calls/second. I refractored to make the code asynchronous but the issue continued. The workaround I found was only doing 20 records at a time.

If there is an error with a record it will write to a file with the MMSIDs that didn't GET or PUT.

Install dependencies
```
npm install
```
Run with 'node index.js'
```
node index.js
```
## License
ISC. Copyright (c) 2021 Jamie Carlstone
## Questions
* https://github.com/jdcar
jamie dot carlstone at northwestern dot edu
