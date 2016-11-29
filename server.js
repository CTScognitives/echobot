var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID || 'f9f917b6-bf62-413d-9cf3-9e9ee84d37f1',
    appPassword: process.env.MICROSOFT_APP_PASSWORD || 'V46X32ymeXx70mDP6edbZvn'
});

/*var connector = new builder.ChatConnector({
    appId: null ,
    appPassword: null 
});*/

var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());
server.get(/.*/, restify.serveStatic({
	'directory': '.',
	'default': 'index.html'
}));
//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', function (session) {
    session.send("Hello World");
});
