var server = require('../server');
var chai = require('chai');
var chaiHttp = require('chai-http');
var sinon = require('sinon');
var expect = chai.expect;

chai.use(chaiHttp);

describe('Credits API', () => {

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
        it('should return NOT FOUND', (done) => {
            chai.request(server.app)
                .get('/api/v1')
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                });
            });
    });

    describe('GET /credits', () => {
        it('should return all credits', (done) => {
                chai.request(server.app)
                .get('/api/v1/credits')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    //expect(res.body).to.be.an('array');
                    //expect(res.body).to.have.lengthOf(2);
                    done();
                });
            });
    });

    
});
