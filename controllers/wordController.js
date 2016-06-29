const word = require('../models/wordManager');

exports.getPhonetic = (req, res) => {
    if (typeof req.params.id !== 'undefined' && req.params.id) {
        word.getPhonetic(req.params.id, (err, data) => {
            if (err) {
                return console.log(err);
            }
            return res.send(data);
        });
    }
};
