var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors'); 
var path = require('path');
var cache = require('memory-cache');
var passport = require('passport');
var LocalAPIKey = require('passport-localapikey-update').Strategy;

var projectResource = require('./projectResource.js');
var rateResource = require('./rate-resource.js');

ObjectID = require('mongodb').ObjectID;

var ApiKey = require('./apikeys');
var Credit = require('./credits');

var CREDITS_APP_DIR = '/dist/credits-app';
var API_BASE_URL = '/api/v1';

var CACHE_RATE_PREFIX = 'rate_';
var CACHE_TIMEOUT = 60000   // ms


passport.use(new LocalAPIKey(
    (apikey, done) => {
        ApiKey.findOne({apikey: apikey}, (err, user) => {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Unknown apikey ' +apikey });
            } else {
                return done(null, user);
            }
        });
    }
));


// init app
var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());


// -------------------------
// angular app
// -------------------------

app.use(express.static(path.join(__dirname, CREDITS_APP_DIR))); 
app.get('/', function(req, res) { 
    res.sendFile(path.join(__dirname, CREDITS_APP_DIR, '/index.html')); 
}); 


// -------------------------
// login
// -------------------------
app.post(API_BASE_URL + "/login", (req, res) => {
    var login = req.body;
    ApiKey.findOne({user: login.user}, (err, apikey) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        if (!apikey){
            res.sendStatus(401);
        } else {
            apikey.comparePassword(login.password, (err, r) => {
                if (err) res.sendStatus(500);
                if (r) {
                    res.send({"user": apikey.user, "token": apikey.apikey});
                } else {
                    res.sendStatus(401);
                }
            });
        }
    })
});


// -------------------------
// credits
// -------------------------

// get all credits
app.get(API_BASE_URL + "/credits", 
    passport.authenticate('localapikey', {session: false}),
    (req, res) => {
        Credit.find((err, credits) => {
            if (err){
                console.error("Error accessing database:\n" + err);
                res.sendStatus(500);
            } else {
                res.send(credits.map((credit)=> {
                    return credit.cleanup();
                }));
            }
        });
});


// single credit
app.get(API_BASE_URL + "/credits/:id",
    passport.authenticate('localapikey', {session: false}),
    (req, res) => {
        var id = req.params.id;
        Credit.findById(id, (err, credit) => {
            if (err) {
                console.error("Error accessing database:\n" + err);
                res.sendStatus(500);
            } else {
                if (!credit) {
                    res.sendStatus(404);
                } else {
                    res.send(credit.cleanup());
                }
            }
        });
});

// new credit
app.post(API_BASE_URL + "/credits", 
    passport.authenticate('localapikey', {session: false}),
        (req, res) => {
        var newCredit = req.body;
        newCredit._id = new ObjectID();
        newCredit.created = new Date();
        Credit.create(newCredit, (err, credit) => {
            if (err) {
                console.error("Error accessing database:\n" + err);
                res.sendStatus(500);
            } else {
                console.info("New credit created:\n " + credit);
                res.status(201).send(credit.cleanup());
            }
        });
});


// update credit
app.put(API_BASE_URL + "/credits/:id", 
    passport.authenticate('localapikey', {session: false}),
    (req, res) => {
        var id = req.params.id;
        var updatedCredit = req.body;
        Credit.findByIdAndUpdate(id, updatedCredit, (err, credit) => {
            if (err) {
                console.error("Error accessing database:\n" + err);
                res.sendStatus(500);
            } else {
                if (!credit) {
                    res.sendStatus(404);
                } else {
                    res.send(updatedCredit);
                }
            }
        });
});


// delete credit
app.delete(API_BASE_URL + "/credits/:id", 
    passport.authenticate('localapikey', {session: false}),
    (req, res) => {
        var id = req.params.id;
        Credit.findByIdAndDelete(id, (err, credit) => {
            if (err) {
                console.error("Error accessing database:\n" + err);
                res.sendStatus(500);
            } else {
                if (!credit) {
                    res.sendStatus(404);
                } else {
                    console.info("Credit deleted:\n" + credit);
                    // TODO: dont send credit back to frontend
                    res.send(credit);
                }
            }
        });
});

// -------------------------
// project info
// -------------------------

// single project
app.get(API_BASE_URL + "/projects/:id",
    passport.authenticate('localapikey', {session: false}),
    (req, res) => {
        var id = req.params.id;
        projectResource.getProject(id)
        .then((body) => {
            res.send(body);
        }).catch((error) => {
            console.log('error:'+error);
            res.sendStatus(500);
    });
});


// -------------------------
// rates
// -------------------------

// get rate 
app.get(API_BASE_URL + "/rates/:symbol",
    passport.authenticate('localapikey', {session: false}),
    (req, res) => {
        var symbol = req.params.symbol;
        symbol = symbol.toUpperCase();
        let cache_key = CACHE_RATE_PREFIX + symbol; // rate_usd
        rate = cache.get(cache_key);
        if (rate) {
            console.log("-- Rate: " + cache_key + " was cached");
            res.send({'rate': rate});
        } else {
            rateResource.getRate()
            .then((body) => {
                let rate_value = body.rates[symbol];
                console.log("-- Caching rate for " + symbol)
                cache.put(cache_key, rate_value, CACHE_TIMEOUT)
                res.send({'rate': body.rates[symbol]})
            }).catch((error) => {
                console.log('error:'+error);
                res.sendStatus(500);
            });
        }
});

module.exports.app = app;
