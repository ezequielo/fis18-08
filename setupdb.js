var mongoose = require('mongoose');
var ApiKey = require('./apikeys');

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

var user = (process.env.USER || 'fis');
var password = (process.env.PSDW || 'asdf');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    ApiKey.deleteMany({}, (err) => {
        var testUser = new ApiKey({user: user, password: password});
        testUser.save(function(err, user) {
            if(err) {
                console.log(err);
              } else {
<<<<<<< HEAD
                console.log('user: ' + user.user + ", password: " 
                + password + ", apikey: " + user.apikey + " saved.");
=======
                console.log('user: ' + user.user + ", "+ user.apikey + " saved.");
>>>>>>> 2a869212b49da171bbe6519107ee24c1ba364144
              }
        });        
    })
});