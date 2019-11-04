const router = require('express').Router();

module.exports = function (db) {
    const AppController = require('../controllers/appController')(db);

    router.get('/', AppController.renderIndex);
    router.get('/saved', AppController.renderSaved);

    return router;
};
