var express = require('express');
var bodyParser = require('body-parser');
var DataStore = require("nedb");
var cors = require('cors'); 
var path = require('path') 


var port = (process.env.PORT || 3000);
var CREDITS_APP_DIR = '/dist/credits-app';
var API_BASE_URL = '/api/v1';
var dbFileName = __dirname + "/credicts.json";


// init app
var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, CREDITS_APP_DIR))); 
app.get('/', function(req, res) { 
res.sendFile(path.join(__dirname, CREDITS_APP_DIR, '/index.html')); 
});

var initialCredits = [
    { "project_id": "A02", "total": 200000 },
    { "project_id": "D04", "total": 450000 }
];

/*
// TODO: fake data to be removed when using mongodb
credits = [
    {
        "project_id": 1,
        "expenses": [],
        "income": [],
        "credit": 0
    },
    {
        "project_id": 2,
        "expenses": [
            {
                "id": 1,
                "type": "execution",
                "concept": "Phase 1.1",
                "total": 25600
            }
        ],
        "income": [
            {
                "id": 3,
                "concept": "Monthly income",
                "total": 50000
            }
        ],
        "credit": 0
    }
]

credits2 = [
    {
        "project_id": 1,
        "expenses": [],
        "income": [],
        "credit": 28000
    },
    {
        "project_id": 2,
        "expenses": [],
        "income": [],
        "credit": 1000
    }
]


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
    res.send(credits2)
});

// single credit
app.get(API_BASE_URL + "/credits/:id", (req, res) => {
    var project_id = req.params.id;
    console.log(project_id);
    credit = credits2.find(credit => credit.project_id == project_id);
    if (credit){
        res.send(credit);
    } else {
        res.sendStatus(404);
    }
});

// new credit
app.post(API_BASE_URL + "/credits", (req, res) => {
    var credit = req.body;
    
    console.log(credit);
    db.insert(contact);
    credits2.push(credit);
    res.sendStatus(201);
});

// delete credit
app.delete(API_BASE_URL + "/credits/:id", (req, res) => {
    var project_id = req.params.id;
    console.log(project_id);
    // use === instead of ==
    // should search for it first, if not found 404, then delete
    credits2 = credits2.filter(credit => credit.project_id != project_id);
    res.send(credits2);
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
*/

var db = new DataStore({
    filename: dbFileName,
    autoload: true
});

db.find({},(err,credits)=>{
    if(err){
        console.error("Error accesing DB");
        process.exit(1);
    }else{
        if(credits.length == 0){
            console.log("Empty DB, initializaing data...");
            db.insert(initialCredits);
        }else{
            console.log("Loaded DB with "+credits.length+" credits.");
        }
           
    }
});

app.get("/", (req, res) => {
    res.send("<html><body><h1>My server</h1></body></html>");
});

app.get(API_BASE_URL + "/credits", (req, res) => {
    // Obtain all credits
    console.log(Date()+" - GET /credits");
    
    db.find({},(err,credicts)=>{
        if(err){
            console.error("Error accesing DB");
            res.sendStatus(500);
        }else{
            res.send(credits.map((credit)=>{
                //delete credits.project_id; //modificado
                return credicts;
            }));
        }
    });

});

app.post(API_BASE_URL + "/credicts", (req, res) => {
    // Create a new credict
    console.log(Date()+" - POST /credicts");

    var contact = req.body;

    db.insert(credicts);   //modificado

    res.sendStatus(201);
});

app.put(API_BASE_URL + "/credicts", (req, res) => {
    // Forbidden
    console.log(Date()+" - PUT /credicts");

    res.sendStatus(405);
});

app.delete(API_BASE_URL + "/credicts", (req, res) => {
    // Remove all contacts
    console.log(Date()+" - DELETE /credicts");

    db.remove({});
    
    res.sendStatus(200);
});


app.post(API_BASE_URL + "/credicts/:project_id", (req, res) => {
    // Forbidden
    console.log(Date()+" - POST /credicts");

    res.sendStatus(405);
});



app.get(API_BASE_URL + "/credicts/:project_id", (req, res) => {
    // Get a single 
    var project_id = req.params.project_id;
    console.log(Date()+" - GET /credicts/"+project_id);

    db.find({"project_id": project_id},(err,credicts)=>{
        if(err){
            console.error("Error accesing DB");
            res.sendStatus(500);
        }else{
            if(contacts.length>1){
                console.warn("Incosistent DB: duplicated name");
            }
            res.send(credicts.map((credicts)=>{
                delete credicts.project_id; //modificado
                return credicts;
            })[0]);
        }
    });
});


app.delete(API_BASE_URL + "/credicts/:project_id", (req, res) => {
    // Delete a single contact
    var project_id = req.params.project_id;
    console.log(Date()+" - DELETE /credicts/"+project_id);

    db.remove({"project_id": project_id},{},(err,numRemoved)=>{
        if(err){
            console.error("Error accesing DB");
            res.sendStatus(500);
        }else{
            if(numRemoved>1){
                console.warn("Incosistent DB: duplicated name");
            }else if(numRemoved == 0) {
                res.sendStatus(404);
            } else {
                res.sendStatus(200);
            }
        }
    });
});

app.put(API_BASE_URL + "/credicts/:project_id", (req, res) => {
    // Update contact
    var project_id = req.params.project_id;
    var updatedContact = req.body;
    console.log(Date()+" - PUT /credicts/"+project_id);

    if(project_id != updatedCredict.project_id){
        res.sendStatus(409);
        return;
    }

    db.update({"project_id": project_id},updatedCredict,(err,numUpdated)=>{
        if(err){
            console.error("Error accesing DB");
            res.sendStatus(500);
        }else{
            if(numUpdated>1){
                console.warn("Incosistent DB: duplicated name");
            }else if(numUpdated == 0) {
                res.sendStatus(404);
            } else {
                res.sendStatus(200);
            }
        }
    });
});


app.listen(port);

console.log("Server ready");
 