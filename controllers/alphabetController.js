const alphabet = require('../models/alphabetManager');

exports.getAlphabet = (req, res) => {
    alphabet.getAlphabet((err, data) => {
        if (err) {
            return console.log(err);
        }
        return res.send(data);
    });
};
