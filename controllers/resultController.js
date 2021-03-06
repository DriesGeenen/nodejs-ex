'use strict';

var ResultRepository = require('../repositories/resultRepository');
var mongoose = require('mongoose');
var Result = mongoose.model('Result');

exports.getAllResults = function (req, res) {
    console.log('Controller reached');
    Result.find({}, (function (err, results) {
        if (err) {
            console.log("Should return error");
            return res.status(500).json({success: false, msg: 'Failed to get results', error: err});
        }
        console.log('Should return now');
        return res.status(200).json(results);

    }));
};

exports.getResultsByUserId = function (req, res) {
    var promise = ResultRepository.getResultsByUserId(req);
    promise.then(function (results) {
        return res.status(200).json(results);
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to get results', error: err});
    });
};

exports.getResultById = function (req, res) {
    var promise = ResultRepository.getResultById(req);
    promise.then(function (result) {
        return res.status(200).json(result);
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to get result', error: err});
    });
};

exports.addResult = function (req, res) {
    // remember which user posted the result
    req.body.user = req.user.data._id;
    // set date to today
    req.body.date = new Date();

    console.log(req.body);
    var promise = ResultRepository.addResult(req);
    promise.then(function () {
        return res.status(200).json({success: true, msg: 'Result created'});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to create result', error: err});
    });
};

exports.updateResult = function (req, res) {
    var promise = ResultRepository.updateResult(req);
    promise.then(function () {
        return res.status(200).json({success: true, msg: 'Result updated'});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to update result', error: err});
    });
};

exports.deleteResult = function (req, res) {
    var promise = ResultRepository.deleteResult(req);
    promise.then(function () {
        return res.status(200).json({success: true, msg: 'Result removed'});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to remove result', error: err});
    });
};
