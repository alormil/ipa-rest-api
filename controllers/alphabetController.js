// Include Manager file which will contain business logic in order retrieve alphabet
const alphabet = require('../models/alphabetManager');

exports.getAlphabet = (req, res) => {
    // We validate that we have a proper language parameter passed to the API call
    if (typeof req.params.language !== 'undefined' && req.params.language) {
        alphabet.getAlphabet(req.params.language, (err, data) => {
            // Return an error if one is found
            if (err) {
                return console.log(err);
            }
            // Return the result of the getAlphabet function
            return res.send(data);
        });
    }
};
