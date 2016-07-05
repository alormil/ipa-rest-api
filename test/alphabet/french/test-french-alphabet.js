const supertest = require('supertest');
const request = supertest('http://localhost:3000');

describe('French International Phonetic Alphabet', () => {
    it('GET /alphabet/fr should return 200 JSON response', (done) => {
        request.get('/alphabet/fr')
        .expect(200)
        .expect('content-type', 'application/json')
        .end(done);
    });
});

