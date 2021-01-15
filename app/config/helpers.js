const moment = require('moment');

module.exports = () => {
    return {
        scrapeHandlerCssTricks: (db, $, el) => {
            const result = {};
            const date = $(el).find('.author-row').find('time').text().trim();
            const summary = $(el).find('.card-content').find('p').text().trim();
            result.timestamp = moment(date, 'MMM Do, YYYY').unix();
            result.site = 'css-tricks';
            result.siteUrl = 'https://css-tricks.com/';
            result.title = $(el).find('h2').find('a').text().trim();
            result.link = $(el).find('h2').find('a').attr('href');
            result.summary = summary;
            result.date = moment(date, 'MMM Do, YYYY').format('MMM Do, YYYY');
            db.Article.create(result)
                .then(() => {
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        scrapeHandlerCodrops: (db, $, el) => {
            const result = {};
            const date = $(el).find('time').text();
            const summary = $(el).find('.ct-feat-excerpt').text().trim();
            result.timestamp = moment(date, 'Mon DD, YYYY').unix();
            result.site = 'codrops';
            result.siteUrl = 'https://tympanus.net/codrops/';
            result.title = $(el).find('h2').find('a').text().trim();
            result.link = $(el).find('h2').find('a').attr('href').trim();
            result.summary = `${summary}...`;
            result.date = moment(date, 'Mon DD, YYYY').format('MMM Do, YYYY');
            db.Article.create(result)
                .then(() => {
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        renderPage: (res, db, page, isSaved, filter) => {
            const renderObj = {};
            renderObj.isSavedPage = isSaved;
            db.Article.find(filter)
                .populate('note')
                .sort({ timestamp: -1 })
                .then((articles) => {
                    if (articles.length > 0) {
                        renderObj.success = true;
                        const hasNote = articles.map((x) => {
                            x.hasNote = x.note !== undefined;
                            return x;
                        });
                        const renderedArticles = hasNote.map((x, i) => {
                            x.featured = i === 0;
                            return x;
                        });
                        renderObj.articles = renderedArticles;
                        res.render(page, renderObj);
                    } else {
                        renderObj.success = false;
                        res.render(page, renderObj);
                    }
                })
                .catch(() => { });
        }
    };
};
