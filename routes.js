const wordController = require('./controllers/wordController');
const alphabetController = require('./controllers/alphabetController');

module.exports = (server) => {
    // Return IPA
    server.get('/fr/ipa/:name', wordController.getPhonetic);

    // Return IPA Alphabet
    server.get('/fr/alphabet', alphabetController.getAlphabet);
};
