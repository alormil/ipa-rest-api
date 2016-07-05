const supertest = require('supertest');
const request = supertest('http://localhost:3000');

describe('English International Phonetic Words', () => {
    it('GET /ipa/en/dog should return 200 JSON response', (done) => {
        request.get('/ipa/en/dog')
        .expect(200)
        .expect('content-type', 'application/json')
        .end(done);
    });
});

