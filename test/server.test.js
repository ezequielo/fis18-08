var server = require('../server');
var chai = require('chai');
var chaiHttp = require('chai-http');
var sinon = require('sinon');
var expect = chai.expect;
var Credit = require('../credits');
var Apikey = require('../apikeys');

chai.use(chaiHttp);

const CREDIT = {
    "_id": "5c2ba7bcaf87bb00121cef7d",
    "projectId": "A-01", 
    "created": "2019-01-01T17:47:40.045Z", 
    "personnelExpenses": 110, 
    "executionExpenses": 4, 
    "income": 200, 
    "total": 86 
}

describe('Credits API', () => {

    before(() => {
        var ApiKeyStub = sinon.stub(Apikey, 'findOne');
        ApiKeyStub.yields(null, new Apikey({user: "test", token: "test"}));    
    });

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
        var credit = new Credit(CREDIT);
        var creditMock = sinon.mock(credit);
        creditMock.expects('cleanup').returns(CREDIT);
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

    describe('GET /credits/<id>', () => {
        var creditMock;
        before(function () {
            var credit = new Credit(CREDIT);
            creditMock = sinon.mock(credit);
            creditMock.expects('cleanup').returns(CREDIT);
            var CreditStub = sinon.stub(Credit, 'findOne');
            CreditStub.yields(null, credit);
        });

        after(function () {
            Credit.findOne.restore();
        });

        it('should return one credit', (done) => {
            chai.request(server.app)
                .get('/api/v1/credits/5c2ba7bcaf87bb00121cef7d')
                .query({ apikey: "test" })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body._id).to.be.equal('5c2ba7bcaf87bb00121cef7d');
                    creditMock.verify();
                    done();
            });
        });
    });

    describe('GET /credits/<id>', () => {
        var creditMock;
        before(function () {
            var credit = new Credit(CREDIT);
            creditMock = sinon.mock(credit);
            var CreditStub = sinon.stub(Credit, 'findOne');
            CreditStub.yields(null, null);
        });

        after(function () {
            Credit.findOne.restore();
        });

        it('should return 404', (done) => {
            chai.request(server.app)
                .get('/api/v1/credits/5c2df91973be9400127ecbf9')
                .query({ apikey: "test" })
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    creditMock.verify();
                    done();
            });
        });
    });


    describe('POST /credits', () => {

        var credit = CREDIT;
        var creditMock;

        before(function () {
            creditMock = sinon.mock(Credit);
            creditMock.expects('create').yields(null, new Credit(credit));
        });

        after(function () {
            creditMock.restore();
        })
        
        it('should create new credit', (done) => {
            chai.request(server.app)
                .post('/api/v1/credits')
                .send(credit)
                .query({ apikey: "test" })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    creditMock.verify();
                    done();
                });  
            });
    });


    describe('POST /credit', () => {

        var credit = CREDIT;
        var creditMock;

        before(function () {
            creditMock = sinon.mock(Credit);
            creditMock.expects('create').yields(true);
        });

        after(function () {
            creditMock.restore()
        })

        it('should return 500 if fails', (done) => {
            chai.request(server.app)
                .post('/api/v1/credits')
                .send(credit)
                .query({ apikey: "test" })
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    creditMock.verify();
                    done();
                });  
            });
    }); 
    
    
    describe('PUT /credits/<id>', () => {

        var credit = new Credit(CREDIT);
        var creditMock;
        var CreditStub;

        before(function () {
        CreditStub = sinon.stub(Credit, 'findOneAndUpdate');
        CreditStub.yields(null, [credit]);
        creditMock = sinon.mock(credit);
        });

        after(function () {
            CreditStub.restore()
            creditMock.restore()
        })
        
        it('it should update a credit', (done) => {
            chai.request(server.app)
                .put('/api/v1/credits/5c2ba7bcaf87bb00121cef7d')
                .query({ apikey: "test" })
                .send(credit)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    creditMock.verify();
                    done();
                });  
        });
    });

    describe('DELETE /credits/<id>', () => {

        var credit = new Credit(CREDIT);
        creditMock = sinon.mock(credit);
        var CreditStub = sinon.stub(Credit, 'findOneAndDelete');
        CreditStub.yields(null, [credit]);

        it('it should update a credit', (done) => {
            chai.request(server.app)
                .delete('/api/v1/credits/5c2ba7bcaf87bb00121cef7d')
                .query({ apikey: "test" })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    creditMock.verify();
                    done();
                });  
        });
    });
});