var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors'); 
var path = require('path');

var Credit = require('./credits');

var CREDITS_APP_DIR = '/dist/credits-app';
var API_BASE_URL = '/api/v1';


// init app
var app = express();
app.use(bodyParser.json());
app.use(cors());


// -------------------------
// angular app
// -------------------------

app.use(express.static(path.join(__dirname, CREDITS_APP_DIR))); 
app.get('/', function(req, res) { 
    res.sendFile(path.join(__dirname, CREDITS_APP_DIR, '/index.html')); 
}); 



// -------------------------
// credits
// -------------------------

// get all credits
app.get(API_BASE_URL + "/credits", (req, res) => {
    Credit.find((err, credits) => {
        if (err){
            console.error("Error accessing database:\n" + err);
            res.sendStatus(500);
        } else {
            res.send(credits.map((credit)=> {
                return credit;
            }));
        }
    });
});


// single credit
app.get(API_BASE_URL + "/credits/:id", (req, res) => {
    var id = req.params.id;
    Credit.findById(id, (err, credit) => {
        if (err) {
            console.error("Error accessing database:\n" + err);
            res.sendStatus(500);
        } else {
            if (!credit) {
                res.sendStatus(404);
            } else {
                res.send(credit);
            }
        }
    });
});

// new credit
app.post(API_BASE_URL + "/credits", (req, res) => {
    var credit = req.body;
    Credit.create(credit, (err, credit) => {
        if (err) {
            console.error("Error accessing database:\n" + err);
            res.sendStatus(500);
        } else {
            res.status(201).send(credit);
        }
    });
});


// update credit
app.put(API_BASE_URL + "/credits/:id", (req, res) => {
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
app.delete(API_BASE_URL + "/credits/:id", (req, res) => {
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
                res.send(credit);
            }
        }
    });
});


module.exports.app = app;
