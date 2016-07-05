const supertest = require('supertest');
const request = supertest('http://localhost:3000');

describe('French International Phonetic Words', () => {
    it('GET /ipa/fr/chien should return 200 JSON response', (done) => {
        request.get('/ipa/fr/chien')
        .expect(200)
        .expect('content-type', 'application/json')
        .end(done);
    });
});

