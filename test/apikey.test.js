var chai = require('chai');
var mongoose = require('mongoose');
var expect = chai.expect;
var ApiKey = require('../apikeys');


describe('ApiKey DB Tests', () => {

    before((done) => {
        var dbUrl = (process.env.DB || 'mongodb://localhost/test');
        mongoose.connect(dbUrl);
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            done();
        });          
    });

    beforeEach((done) => {
        ApiKey.deleteMany({}, (err) => {
            done();
        });      
    });

    // since we dont do CRUD with Apikeys we only need to check reading
    it('finds an apikey', (done) => {
        var key = new ApiKey({
            user: "fis",
            pasword: "test",
            token: "something"
        });
        key.save((err, apikey) => {
            expect(err).is.null;
            ApiKey.find({user: "fis"}, (err, apikeys) => {
                expect(err).is.null;
                expect(apikeys).to.have.lengthOf(1);
                done();
            });
        });
    });

    after((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });   
});
