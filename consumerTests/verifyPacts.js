const pact = require('@pact-foundation/pact-node')
const path = require('path')
const app = require('../server').app;
const sinon = require('sinon');
var Credit = require('../credits');

var mongoose = require('mongoose');
var ApiKey = require('../apikeys');
var port = (process.env.PORT || 3000);

// read only user
var pact_broker_user = (process.env.PACT_BROKER_USER || 'cR1ueW0dxOpM0QphyREHOOD2JdxwMrkN');
var pact_broker_password = (process.env.PACT_BROKER_PASSWORD || 'IAkTId9fL3jlTgpkpMNNaANkUS483l'); 

const opts = {
    pactBrokerUsername: pact_broker_user,
    pactBrokerPassword: pact_broker_password,
    providerBaseUrl: 'http://localhost:3000', // where your service will be running during the test, either staging or localhost on CI
    providerStatesSetupUrl: 'http://localhost:3000/test/setup', // the url to call to set up states
    pactUrls: ["https://universidaddesevilla.pact.dius.com.au/pacts/provider/G2/consumer/G8/latest"], // the pacts to test against
    customProviderHeaders: ['apikey: test']
}

app.post('/test/setup', (req, res) => {
    const state = req.body.state
    console.log (req.body)
    switch (state) {
      case 'it has one credit':
        var credit = {
            "_id": "5c2ba7bcaf87bb00121cef7d",
            "projectId": "A-01", 
            "created": "2019-01-01T17:47:40.045Z", 
            "personnelExpenses": 110, 
            "executionExpenses": 4, 
            "income": 200, 
            "total": 86 
        };
        Credit.deleteMany({}, (err) => {
            Credit.create(credit, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        })
        break
    default:
        break
    }
    res.end()
});

console.log("Starting API server...");
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    app.listen(port);
    console.log("Server ready!");


    var ApiKeyStub = sinon.stub(ApiKey, 'findOne');
    ApiKeyStub.yields(null, new ApiKey({user: "test"}));
       
    pact.verifyPacts(opts).then(() => {
        console.log('success')
        process.exit(0)
    }).catch((error) => {
        console.log('failed', error)
        process.exit(1)
    });
});