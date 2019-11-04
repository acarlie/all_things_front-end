const router = require('express').Router();

module.exports = function (db) {
    const AppController = require('../controllers/appController')(db);

    router.get('/scrape', AppController.scrape);
    router.post('/articles/:id', AppController.saveNote);
    router.put('/save/:id', AppController.saveArticle);
    router.delete('/delete', AppController.deleteAll);

    return router;
};
