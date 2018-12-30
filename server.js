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
            res.send(201, credit);
        }
    });
});


// update credit
app.put(API_BASE_URL + "/credits/:id", (req, res) => {
    var id = req.params.id;
    var credit = req.body;
    Credit.findByIdAndUpdate(id, credit, (err, credit) => {
        if (err) {
            console.error("Error accessing database:\n" + err);
            res.sendStatus(500);
        } else {
            if (!credit) {
                res.sendStatus(404);
            } else {
                res.sendStatus(200);
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
                res.sendStatus(200);
            }
        }
    });
});


// -------------------------
// credit income
// -------------------------

// all income
app.get(API_BASE_URL + "/credits/:id/income", (req, res) => {

});
// single income
app.get(API_BASE_URL + "/credits/:id/income/:id", (req, res) => {

});
// create income
app.post(API_BASE_URL + "/credits/:id/income", (req, res) => {

});
// update income
app.put(API_BASE_URL + "/credits/:id/income/:id", (req, res) => {

});
// delete income
app.delete(API_BASE_URL + "/credits/:id/income/:id", (req, res) => {

});


// -------------------------
// credit expenses
// -------------------------

// all expenses
app.get(API_BASE_URL + "/credits/:id/expenses", (req, res) => {

});
// single expenses
app.get(API_BASE_URL + "/credits/:id/expenses/:id", (req, res) => {

});
// create expenses
app.post(API_BASE_URL + "/credits/:id/expenses", (req, res) => {

});
// update expenses
app.put(API_BASE_URL + "/credits/:id/expenses/:id", (req, res) => {

});
// delete expenses
app.delete(API_BASE_URL + "/credits/:id/expenses/:id", (req, res) => {

});

 
module.exports.app = app;
