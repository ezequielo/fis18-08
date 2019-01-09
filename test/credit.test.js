var chai = require('chai');
var mongoose = require('mongoose');
var expect = chai.expect;
var Credit = require('../credits');


describe('Credits DB connection', () => {

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
        Credit.deleteMany({}, (err) => {
            done();
        });
    });

    it('writes a credit in the DB', (done) => {
        var testCredit = new Credit({
            "_id": "5c2ba7bcaf89bb00121cef7f",
            "projectId": "M-80", 
            "created": "2019-01-05T14:17:40.045Z", 
            "personnelExpenses": 500, 
            "executionExpenses": 1000, 
            "income": 2000, 
            "total": 500 
        });
        testCredit.save((err, credit) => {
            expect(err).is.null;
            Credit.find({}, (err, credits) => {
                expect(err).is.null;
                expect(credits).to.have.lengthOf(1);
                done();
            });
        });
    });

    it('finds a credit in the DB', (done) => {
        var testCredit = new Credit({
            "_id": "5c2ba7bcaf89bb00121cef7f",
            "projectId": "M-80", 
            "created": "2019-01-05T14:17:40.045Z", 
            "personnelExpenses": 500, 
            "executionExpenses": 1000, 
            "income": 2000, 
            "total": 500 
        });
        testCredit.save((err, credit) => {
            expect(err).is.null;
            Credit.findOne({_id: "5c2ba7bcaf89bb00121cef7f"}, (err, credit) => {
                expect(err).is.null;
                expect(credit.projectId).equals("M-80");
                done();
            });
        });
    });

    it('updates a credit in the DB', (done) => {
        var testCredit = new Credit({
            "_id": "5c2ba7bcaf89bb00121cef7f",
            "projectId": "M-80", 
            "created": "2019-01-05T14:17:40.045Z", 
            "personnelExpenses": 500, 
            "executionExpenses": 1000, 
            "income": 2000, 
            "total": 500 
        });
        testCredit.save((err, credit) => {
            expect(err).is.null;
            credit.projectId = "test"
            Credit.findOneAndUpdate({_id: "5c2ba7bcaf89bb00121cef7f"}, credit, {new: true}, (err, replaced) => {
                expect(err).is.null;
                expect(replaced.projectId).equals("test");
                done();
            });
        });
    });

    it('deletes a credit in the DB', (done) => {
        var testCredit = new Credit({
            "_id": "5c2ba7bcaf89bb00121cef7f",
            "projectId": "M-80", 
            "created": "2019-01-05T14:17:40.045Z", 
            "personnelExpenses": 500, 
            "executionExpenses": 1000, 
            "income": 2000, 
            "total": 500 
        });
        testCredit.save((err, credit) => {
            expect(err).is.null;
            Credit.findOneAndDelete({_id: "5c2ba7bcaf89bb00121cef7f"}, (err, credit) => {
                expect(err).is.null;
                Credit.find({}, (err, credits) => {
                    expect(err).is.null;
                    expect(credits).to.have.lengthOf(1);
                    done();
                })
            });
        });
    });

    after((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    }); 
});


