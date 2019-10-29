const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment');

module.exports = function (app, db) {

    app.get('/scrape', function (req, res) {
        axios.get('https://css-tricks.com/').then((webpage) => {
            const $ = cheerio.load(webpage.data);
            $('.article-article').each((i, el) => {
                const date = $(el).find('.article-publication-meta').find('time').attr('datetime');
                const result = {};

                result.title = $(el).find('h2').find('a').text().trim();
                result.link = $(el).find('h2').find('a').attr('href').trim();
                result.summary = $(el).find('.article-content').find('p').text().trim();
                result.date = moment(date, 'YYYY-MM-DD').format('MMM Do, YYYY');

                db.Article.create(result)
                    .then((articleData) => {
                        console.log(articleData);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
            res.redirect('/');
        });
    });
};
