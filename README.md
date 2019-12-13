ReactJS: SimpleBackend
=================
"SimpleBackend" is sample code of a Google Sheet connected to a Firebase Database.

The business use case is to manage spreadsheet data independently, and when ready for 
public use, transfer to the database. Once transferred, the data is available to all web 
& mobile clients; there is no need to redeploy. 

This repo is for Web built using ```create-react-app``` (see [docs](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app)). It can be used as 
starter-kit or combined with a monorepo, like [SimpleLanding](https://github.com/og-pr/public_ticket.530) or [SimpleApp](https://github.com/ottograjeda/public_ticket.528) 
for Mobile use on iOS & Android.


Installation
============

Webapp
*  Get the repo
* From root directory, do ```yarn```
* Add Firebase per this guide: [Firebase JS SDK for Webapps](https://firebase.google.com/docs/web/setup/)
**Required** Basic ReactJS knowledge. If repo user needs review, please read [this](https://www.taniarascia.com/getting-started-with-react/) 

Data (Flat JSON)
* Pre made data from [Typicode](https://jsonplaceholder.typicode.com/)
* Custom data you create from [Mockaroo](https://mockaroo.com/)
**Note** If repo data ([xls](https://github.com/ottograjeda/public_ticket.536/blob/master/tente/app/gas/data.xlsx) | [csv](https://github.com/ottograjeda/public_ticket.536/blob/master/tente/app/gas/data.csv)) will be different, update [sheet.js](https://github.com/ottograjeda/public_ticket.536/blob/master/tente/app/gas/sheet.js) & [ListView.js](https://github.com/ottograjeda/public_ticket.536/blob/master/tente/app/components/List/ListView.js) as needed.

Database
* Create [Firebase Realtime Database](https://firebase.google.com/products/realtime-database/)
* Configure 3rd party access to database, per this [guide](https://firebase.google.com/docs/storage/web/start)
**Note** Remember to update Firebase [security rules](https://firebase.google.com/docs/database/security/quickstart) as needed

Spreadsheet
* Create Google Spreadsheet per this [guide](https://support.google.com/docs/answer/6000292?co=GENIE.Platform%3DDesktop&hl=en)
* Install GAS [code from this repo](https://github.com/ottograjeda/public_ticket.536/blob/master/tente/app/gas/sheet.js) (modify as needed)
* Install [External Library](https://sites.google.com/site/scriptsexamples/new-connectors-to-google-services/firebase) for use by Google Apps Script ([GAS](https://developers.google.com/apps-script))

Run
===

For web, from the root directory, do

* ```node_modules/.bin/webpack -p --progress```
* ```node_modules/.bin/webpack-dev-server --content-base public/ --config ./webpack.config.js --inline --hot --colors```
* Manually open a browser to localhost:8080 to see webapp 

Demo & Animated GIFs
===========
* [Google Spreadsheet](https://docs.google.com/spreadsheets/d/1m3JEFMO4zf7em3U4mnXFSttKFHQswltx8LiNM79jZJY/edit?usp=sharing)     
* [Live Demo](https://t-536-react.web.app/) at [Firebase Hosting](https://firebase.google.com/docs/hosting)     
* Google PageSpeed Analysis ([desktop](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Ft-536-react.web.app%2F&tab=desktop) | [mobile](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Ft-536-react.web.app%2F&tab=mobile))
**Note** The spreadsheet & demo are primarily for desktop use.     

![Animated GIF - Webapp on iOS](https://github.com/og-pr/public_ticket.532/blob/master/SimpleForm/_docs/ezgif-720_ios.gif)
![Animated GIF - Webapp on Android](https://github.com/og-pr/public_ticket.532/blob/master/SimpleForm/_docs/ezgif-720_android.gif)
![Animated GIF - Webapp on Desktop](https://github.com/og-pr/public_ticket.532/blob/master/SimpleForm/_docs/ezgif-720_web.gif)

Notes - Development
===========
* Data flow is one-way, from spreadsheet to database (to webapp).
* Data is flat json. The code grabs all data  (in this repo: 100 records).
* Code in [sheet.js](https://github.com/ottograjeda/public_ticket.536/blob/master/tente/app/gas/sheet.js) & [ListView.js](https://github.com/ottograjeda/public_ticket.536/blob/master/tente/app/components/List/ListView.js) can be refactored for nested / complex json.
* [Axios](https://github.com/axios/axios) function in [ListView.js](https://github.com/ottograjeda/public_ticket.536/blob/master/tente/app/components/List/ListView.js) can be used if data will be obtained from external API.
* Custom components for [Card](https://github.com/ottograjeda/public_ticket.536/tree/master/tente/app/components/Card) & [Loader](https://github.com/ottograjeda/public_ticket.536/tree/master/tente/app/components/Loader) used. Can be removed or refactored, as needed.
* [GAS code](https://github.com/ottograjeda/public_ticket.536/blob/master/tente/app/gas/sheet.js) transfers the entire sheet to database. Can be refactored to update 1 or N records.
**Note** Update is done manually. Can be refactored for staff use by adding [spreadsheet button](http://googleappscripting.com/google-spreadsheet-button/).

Inspiration
===========
* [Read and write data in Firebase from Apps Script](https://sites.google.com/site/scriptsexamples/new-connectors-to-google-services/firebase/tutorials/read-and-write-data-in-firebase-from-apps-script) (missing ReactJS webapp code)
* 1 location (the spreadsheet) to update data by any staff member using Google Sheets

