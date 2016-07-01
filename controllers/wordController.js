const word = require('../models/wordManager');

exports.getPhonetic = (req, res) => {
    if ((typeof req.params.language !== 'undefined' && req.params.language) &&
        (typeof req.params.word !== 'undefined' && req.params.word)) {
        word.getPhonetic(req.params.language, req.params.word, (err, data) => {
            if (err) {
                return console.log(err);
            }
            return res.send(data);
        });
    }
};
