module.exports = function (app, db) {
    app.get('/', (req, res) => {
        const renderObj = {};

        db.Article.find({})
            .populate('note')
            .then((articles) => {
                console.log(articles[1].note);
                renderObj.success = true;
                const renderedArticles = articles.map((x, i) => {
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
