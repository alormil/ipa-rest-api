// Including controllers that will handle functions from routing
const wordController = require('./controllers/wordController');
const alphabetController = require('./controllers/alphabetController');

module.exports = (server) => {
    // API route to handle phonetic word retrieval
    server.get('/ipa/:language/:word', wordController.getPhonetic);

    // API call to retrieve International Phonetic Alphabet for specific language
    server.get('/alphabet/:language', alphabetController.getAlphabet);
};
