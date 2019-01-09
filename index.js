var server = require('./server');
var mongoose = require('mongoose');

var dbUrl = (process.env.DB || 'mongodb://localhost/dev'); 
var port = (process.env.PORT || 3000);


console.log("Starting API server..."); 

mongoose.connect(dbUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    server.app.listen(port);
    console.log("Server ready!");
});