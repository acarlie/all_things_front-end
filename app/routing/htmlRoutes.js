module.exports = function (app, db) {
    app.get('/', (req, res) => {
        const renderObj = {};

        db.Article.find({})
            .then((articles) => {
                renderObj.success = true;
                renderObj.articles = articles;
                res.render('index', renderObj);
            })
            .catch(() => {
                renderObj.success = false;
                res.render('index', renderObj);
            });
    });
};
