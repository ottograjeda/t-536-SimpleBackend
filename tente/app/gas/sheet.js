// Google Apps Script (GAS) code for Google Sheets
// Custom Library used = https://sites.google.com/site/scriptsexamples/new-connectors-to-google-services/firebase 
// 

// Static Variables
var FB_URL = " enter firebase detail here ";
var FB_SECRET = " enter firebase detail here ";
var FB_DATABASE = FirebaseApp.getDatabaseByUrl(FB_URL, FB_SECRET); // Custom Library

//...

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom Menu')
      .addItem('Sheet > Firebase', 'pushSheet')
      .addToUi();
}

//...

// pushSheet (dynamic ; check Firebase Datastore)
function pushSheet() {
  var mySheet = SpreadsheetApp.openById(" enter firebase detail here ");
  var dataSheet = mySheet.getSheets()[1]; 
  var lastRow = mySheet.getLastRow();
  var lastColumn = mySheet.getLastColumn();
  var data = mySheet.getSheetValues(1, 1, lastRow, lastColumn); 
  var dataToImport = {}; 
  for(var i = 1; i < data.length; i++) {
      dataToImport[i] = {
         ID: data[i][0],
         userName: data[i][1],
         userEmail: data[i][2],
         userWebsite: data[i][3],     
      };
   }
  FB_DATABASE.setData("allSheet", dataToImport); 
}

//...

// testLibrary (check GAS console)
function testLibrary() {
  var baseUrl = FB_URL;
  var secret = FB_SECRET;
  var database = FirebaseApp.getDatabaseByUrl(baseUrl, secret);
  Logger.log(database.getData());
}

//...

//testPush (hardcoded data ; check GAS console)
function testPush() {
  var data = {"companyName" : "AwesomeCompany", "desc" : "An awesome company"}; 
  var dataToPush = FB_DATABASE.pushData("companies", data); 
  Logger.log(dataToPush);
}

// ***********************************************************************************************

// Firebase Security Rules

// For testing = all public
/*
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
*/

//... 

// For deployment = public read, private write (via authenticated user)
/* 
{
  "rules": {
    ".read": true,
    ".write": false
  }
}
*/
