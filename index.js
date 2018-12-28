var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors'); 
var port = (process.env.PORT || 3000);


// init app
var app = express();
app.use(bodyParser.json());
app.use(cors());


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


// credits
// get all credits
app.get("/credits", (req, res) => {
    res.send(credits2)
});

// single credit
app.get("/credits/:id", (req, res) => {
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
app.post("/credits", (req, res) => {
    var credit = req.body;
    console.log(credit);
    credits2.push(credit);
    res.sendStatus(201);
});

// delete credit
app.delete("/credits/:id", (req, res) => {
    var project_id = req.params.id;
    console.log(project_id);
    // use === instead of ==
    // should search for it first, if not found 404, then delete
    credits2 = credits2.filter(credit => credit.project_id != project_id);
    res.send(credits2);
});



// credit income
// all income
app.get("/credits/:id/income", (req, res) => {

});
// single income
app.get("/credits/:id/income/:id", (req, res) => {

});
// create income
app.post("/credits/:id/income", (req, res) => {

});
// update income
app.put("/credits/:id/income/:id", (req, res) => {

});
// delete income
app.delete("/credits/:id/income/:id", (req, res) => {

});




// credit expenses
// all expenses
app.get("/credits/:id/expenses", (req, res) => {

});
// single expenses
app.get("/credits/:id/expenses/:id", (req, res) => {

});
// create expenses
app.post("/credits/:id/expenses", (req, res) => {

});
// update expenses
app.put("/credits/:id/expenses/:id", (req, res) => {

});
// delete expenses
app.delete("/credits/:id/expenses/:id", (req, res) => {

});



app.listen(port);

console.log("Server ready");
 