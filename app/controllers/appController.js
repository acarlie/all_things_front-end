const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment');

module.exports = function (db) {
    return {
        scrape: function (req, res) {
            axios.get('https://css-tricks.com/').then((webpage) => {
                const $ = cheerio.load(webpage.data);
                $('.article-article').each((i, el) => {
                    const result = {};
                    const date = $(el).find('.article-publication-meta').find('time').attr('datetime');
                    const summary = $(el).find('.article-content').find('p').text().trim();
                    result.timestamp = moment(date, 'YYYY-MM-DD').unix();
                    result.site = 'css-tricks';
                    result.siteUrl = 'https://css-tricks.com/';
                    result.title = $(el).find('h2').find('a').text().trim();
                    result.link = $(el).find('h2').find('a').attr('href').trim();
                    result.summary = summary.substring(0, summary.lastIndexOf('Read'));
                    result.date = moment(date, 'YYYY-MM-DD').format('MMM Do, YYYY');
                    db.Article.create(result)
                        .then(() => {
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                });
                return axios.get('https://tympanus.net/codrops/category/tutorials/');
            }).then((webpage) => {
                const $ = cheerio.load(webpage.data);
                $('.ct-box.post').each((i, el) => {
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
                });
                res.redirect('/');
            });
        },
        saveNote: function (req, res) {
            db.Note.create(req.body)
                .then((noteData) => {
                    return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: noteData._id }, { new: true });
                })
                .then((articleData) => {
                    console.log(articleData);
                })
                .catch((err) => {
                    console.log(err);
                });
            res.redirect('/');
        },
        saveArticle: function (req, res) {
            const toSave = JSON.parse(req.body.saved);
            db.Article.findOneAndUpdate({ _id: req.params.id }, { $set: { saved: toSave } }, { new: true })
                .then((data) => {
                    console.log(data);
                    res.json(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        deleteAll: function (req, res) {
            db.Article.deleteMany({})
                .catch((err) => {
                    console.log(err);
                });
            db.Note.deleteMany({})
                .catch((err) => {
                    console.log(err);
                });
            res.redirect('/');
        },
        renderIndex: (req, res) => {
            const renderObj = {};
            renderObj.isSavedPage = false;
            db.Article.find({})
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
                        res.render('index', renderObj);
                    } else {
                        renderObj.success = false;
                        res.render('index', renderObj);
                    }
                })
                .catch(() => {});
        },
        renderSaved: (req, res) => {
            const renderObj = {};
            renderObj.isSavedPage = true;
            db.Article.find({ saved: true })
                .populate('note')
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
                        res.render('index', renderObj);
                    } else {
                        renderObj.success = false;
                        res.render('index', renderObj);
                    }
                })
                .catch(() => {});
        }
    };
};
