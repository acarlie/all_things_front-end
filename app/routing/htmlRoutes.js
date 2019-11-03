module.exports = function (app, db) {
    app.get('/', (req, res) => {
        const renderObj = {};
        renderObj.isSavedPage = false;

        db.Article.find({})
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
    });

    app.get('/saved', (req, res) => {
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
    });
};
