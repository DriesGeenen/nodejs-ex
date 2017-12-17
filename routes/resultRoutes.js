'use strict';

module.exports = function (app) {
    var ResultController = require('../controllers/resultController');
    var AuthHelper = require('../helpers/authHelper');

    app.route('/results')
        .get(ResultController.getAllResults)
        .post(ResultController.addResult);

    app.route('/results/:id')
        .get(ResultController.getResultById)
        .delete(ResultController.deleteResult)
        .put(ResultController.updateResult);

    app.route('/user/:user/results')
        .get(ResultController.getResultsByUserId);


    /*app.route('/results')
        .get(AuthHelper.logoRequired, ResultController.getAllResults)
        .post(AuthHelper.loginRequired, ResultController.addResult);

    app.route('/results/:id')
        .get(AuthHelper.logoRequired, ResultController.getResultById)
        .delete(AuthHelper.logoRequired, ResultController.deleteResult)
        .put(AuthHelper.logoRequired, ResultController.updateResult);

    app.route('/user/:user/results')
        .get(AuthHelper.loginRequired, ResultController.getResultsByUserId);*/

};
