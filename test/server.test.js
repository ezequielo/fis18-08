var server = require('../server');
var chai = require('chai');
var chaiHttp = require('chai-http');
//var sinon = require('sinon');
var expect = chai.expect;

chai.use(chaiHttp);

describe('Credits API', () => {
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