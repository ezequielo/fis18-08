const chai = require('chai')
chai.use(require('chai-things'));
const provider = require('./mockServer/provider')
const projectResource = require('./projectResource')
const interactions = require('./mockServer/interactions');

const expect = chai.expect

describe('projects api', () => {
    before(() => provider.setup());

    after(() => provider.finalize());
    
    afterEach(() => provider.verify());

    describe('#getProject', () => {
        before(done => {
            provider.addInteraction(interactions.getProject)
                .then(() => {
                    done();
                })
        });

        it('should get a project by its id from server', (done) => {
            projectResource.getProject(1)
              .then((project) => {
                expect(project).to.have.lengthOf(1);
                expect(project).to.contain.an.item.with.property('id', '1');
                expect(project).to.contain.an.item.with.property('organismo','ETSII')
                done();
              }, done)
        }) 
});
})