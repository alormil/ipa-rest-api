const redis = require('redis');
const request = require('request');
const cheerio = require('cheerio');

exports.getPhonetic = (lang, wordToTranslate, callback) => {
    // Get a Redis client from the connection pool
    const client = redis.createClient();

    // Connect to Redis Server
    client.on('connect', () => {
        // This will be the Redis key that will contain the phonetic equivalent
        const key = `${lang}:${wordToTranslate}`;

        // We attempt to retrieve the value from Redis
        client.get(key, (err, result) => {
            // Return an error if one is found
            if (err) {
                return callback(err);
            }
            // If the key is found, simply format the result as JSON and return it
            if (result !== null) {
                const data = {
                    language: lang,
                    word: wordToTranslate,
                    phonetic: result,
                };
                return callback(null, data);
            }
            // The word is not cached in Redis. Retrieve the info from collinsdictionary.com
            if (result === null) {
                // Based on desired language, we need to format the proper URL
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
                // Using request package we will retrieve info from desired URL
                request(url, (error, response, html) => {
                    if (!error) {
                        // Using cheerio package we will extract the phonetic word from page
                        const $ = cheerio.load(html);
                        const phoneticWords = $('span.pron').text();
                        let phoneticWord = '';

                        // Based on language, format the result correctly, as they vary per language
                        if (lang === 'fr') {
                            const regExp = /\(([^)]+)\)/;
                            const matches = regExp.exec(phoneticWords);
                            phoneticWord = matches[1];
                        }
                        if (lang === 'en') {
                            const string = phoneticWords.split(' ');
                            phoneticWord = string[0];
                        }
                        // Remove spaces & special characters from word
                        phoneticWord = phoneticWord.replace(/(\r\n|\n|\r)/gm, '');
                        phoneticWord = phoneticWord.replace(/ /g, '');
                        phoneticWord = phoneticWord.trim();
                        phoneticWord = phoneticWord.replace(/[|&;$%@<>()+]/g, '');

                        // Format the result as JSON, store it in Redis and return it
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
