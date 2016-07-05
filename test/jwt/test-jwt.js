const supertest = require('supertest');
const request = supertest('http://localhost:3000');

describe('JSON Web Token', () => {
    describe('Not Authorized calls', () => {
        it('GET /alphabet/en should return 401 response', (done) => {
            request.get('/alphabet/en')
            .expect(401)
            .end(done);
        });
        it('GET /alphabet/fr should return 401 response', (done) => {
            request.get('/alphabet/fr')
            .expect(401)
            .end(done);
        });
        it('GET /ipa/en/dog should return 401 response', (done) => {
            request.get('/alphabet/en')
            .expect(401)
            .end(done);
        });
        it('GET /ipa/fr/chien should return 401 response', (done) => {
            request.get('/alphabet/en')
            .expect(401)
            .end(done);
        });
    });
});