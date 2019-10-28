const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment');

module.exports = function (app, db) {
    app.get('/scrape', function (req, res) {
        axios.get('https://css-tricks.com/').then((webpage) => {
            const $ = cheerio.load(webpage.data);
            $('.article-card').each((i, el) => {

                const date = $('.article-publication-meta').children('time').attr('datetime');
                const result = {};

                result.title = $('.article-article').children('h2').children('a').text();
                result.link = $('.article-article').children('h2').children('a').attr('href');
                result.summary = $('.article-content').children('p').text();
                result.date = moment(date, 'YYYY-MM-DD').format();

                db.Article.create(result)
                    .then((articleData) => {
                        console.log(articleData);
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                res.send('Scrape Complete');
            });
        })
    });
};
