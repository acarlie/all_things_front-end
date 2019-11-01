module.exports = function (app, db) {
    app.get('/', (req, res) => {
        const renderObj = {};

        db.Article.find({})
            .populate('note')
            .then((articles) => {
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
            })
            .catch(() => {
                renderObj.success = false;
                res.render('index', renderObj);
            });
    });
};
