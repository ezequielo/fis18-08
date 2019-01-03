var server = require('../server');
var chai = require('chai');
var chaiHttp = require('chai-http');
var sinon = require('sinon');
var expect = chai.expect;
var Credit = require('../credits');
var Apikey = require('../apikeys');

chai.use(chaiHttp);

describe('Credits API', () => {



    before(() => {
        var ApiKeyStub = sinon.stub(Apikey, 'findOne');
        ApiKeyStub.yields(null, new Apikey({user: "test"}));    
    })

    describe('GET /', () => {

        it('/', (done) => {
            chai.request(server.app)
                .get('/')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.html;
                    done();
                });
        });
    });

    describe('GET /credits', () => {
        var credit = new Credit({
            "_id": "5c2ba7bcaf87bb00121cef7d",
            "projectId": "A-01", 
            "created": "2019-01-01T17:47:40.045Z", 
            "personnelExpenses": 110, 
            "executionExpenses": 4, 
            "income": 200, 
            "total": 86 
        });
        var creditMock = sinon.mock(credit);
        creditMock.expects('cleanup').returns({
            "_id": "5c2ba7bcaf87bb00121cef7d",
            "projectId": "A-01", 
            "created": "2019-01-01T17:47:40.045Z", 
            "personnelExpenses": 110, 
            "executionExpenses": 4,
            "income": 200, 
            "total": 86 
        });

        var CreditStub = sinon.stub(Credit, 'find');
        CreditStub.yields(null, [credit]);

        it('should return all credits', (done) => {
            chai.request(server.app)
                .get('/api/v1/credits')
                .query({ apikey: "test" })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.have.lengthOf(1);
                    creditMock.verify();
                    done();
                });
        });
    });


});
