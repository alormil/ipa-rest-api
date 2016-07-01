const alphabet = require('../models/alphabetManager');

exports.getAlphabet = (req, res) => {
    if (typeof req.params.language !== 'undefined' && req.params.language) {
        alphabet.getAlphabet(req.params.language, (err, data) => {
            if (err) {
                return console.log(err);
            }
            return res.send(data);
        });
    }
};
