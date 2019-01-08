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

        it('should get contact list from server', (done) => {
            projectResource.getProject(1)
              .then((projects) => {
                expect(projects).to.have.lengthOf(1);
                //expect(projects).to.contain.an.item.with.property('name', 'Foo');
                //expect(projects).to.contain.an.item.with.property('phone', 777);
                done();
              }, done);
        }) 
    })
})