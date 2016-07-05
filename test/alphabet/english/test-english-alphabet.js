const supertest = require('supertest');
const request = supertest('http://localhost:3000');

describe('English International Phonetic Alphabet', () => {
    it('GET /alphabet/en should return 200 JSON response', (done) => {
        request.get('/alphabet/en')
        .expect(200)
        .expect('content-type', 'application/json')
        .end(done);
    });
});

