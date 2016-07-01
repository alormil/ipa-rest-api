const wordController = require('./controllers/wordController');
const alphabetController = require('./controllers/alphabetController');

module.exports = (server) => {
    // Return IPA
    server.get('/ipa/:language/:word', wordController.getPhonetic);

    // Return IPA Alphabet
    server.get('/alphabet/:language', alphabetController.getAlphabet);
};
