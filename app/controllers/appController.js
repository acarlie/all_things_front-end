const axios = require('axios');
const cheerio = require('cheerio');
const helpers = require('../config/helpers')();

module.exports = (db) => {
    return {
        scrape: (req, res) => {
            axios.get('https://css-tricks.com/').then((webpage) => {
                const $ = cheerio.load(webpage.data);
                $('.article-article').each((i, el) => { helpers.scrapeHandlerCssTricks(db, $, el); });
                return axios.get('https://tympanus.net/codrops/category/tutorials/');
            }).then((webpage) => {
                const $ = cheerio.load(webpage.data);
                $('.ct-box.post').each((i, el) => { helpers.scrapeHandlerCodrops(db, $, el); });
                res.redirect('/');
            });
        },
        saveNote: (req, res) => {
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
        saveArticle: (req, res) => {
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
        deleteAll: (req, res) => {
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
        renderIndex: (req, res) => { helpers.renderPage(res, db, 'index', false, {}); },
        renderSaved: (req, res) => { helpers.renderPage(res, db, 'index', true, { saved: true }); }
    };
};
