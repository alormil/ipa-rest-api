// Include Manager file which will contain business logic in order retrieve phonetic result
const word = require('../models/wordManager');

exports.getPhonetic = (req, res) => {
    // We validate that we have a proper language & word parameters are passed to the API call
    if ((typeof req.params.language !== 'undefined' && req.params.language) &&
        (typeof req.params.word !== 'undefined' && req.params.word)) {
        word.getPhonetic(req.params.language, req.params.word, (err, data) => {
            // Return an error if one is found
            if (err) {
                return console.log(err);
            }
            // Return the result of the getPhonetic function
            return res.send(data);
        });
    }
};
