const redis = require('redis');
const request = require('request');
const cheerio = require('cheerio');

exports.getPhonetic = (lang, wordToTranslate, callback) => {
    // Get a Redis client from the connection pool
    const client = redis.createClient();

    // Connect to Redis Server
    client.on('connect', () => {
        const key = `${lang}:${wordToTranslate}`;

        client.get(key, (err, result) => {
            if (err) {
                return callback(err);
            }
            // The word is cached in Redis
            if (result !== null) {
                const data = {
                    language: lang,
                    word: wordToTranslate,
                    phonetic: result,
                };
                // After all data is returned, return results
                return callback(null, data);
            }
            // The word is not cached in Redis. Retrieve the info from WordReference.com
            if (result === null) {
                let langURL = '';
                switch (lang) {
                case 'fr':
                    langURL = 'french-english';
                    break;
                default:
                    langURL = 'english';
                    break;
                }
                const url = `http://www.collinsdictionary.com/dictionary/${langURL}/${wordToTranslate}`;
                request(url, (error, response, html) => {
                    if (!error) {
                        const $ = cheerio.load(html);
                        const phoneticWords = $('span.pron').text();
                        let phoneticWord = '';

                        if (lang === 'fr') {
                            const regExp = /\(([^)]+)\)/;
                            const matches = regExp.exec(phoneticWords);
                            phoneticWord = matches[1];
                        }
                        if (lang === 'en') {
                            const string = phoneticWords.split(' ');
                            phoneticWord = string[0];
                        }
                        phoneticWord = phoneticWord.replace(/(\r\n|\n|\r)/gm, '');
                        phoneticWord = phoneticWord.replace(/ /g, '');
                        phoneticWord = phoneticWord.trim();
                        phoneticWord = phoneticWord.replace(/[|&;$%@<>()+]/g, '');
                        const data = {
                            language: lang,
                            word: wordToTranslate,
                            phonetic: phoneticWord,
                        };
                        client.set(key, phoneticWord);

                        return callback(null, data);
                    }
                });
            }
        });
    });
};
