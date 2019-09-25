"use strict";
var mongoose = require("mongoose");
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var SavedCandidatesRepository = require("./../repository/SavedCandidatesRepository");
var SavedCandidateBusiness = (function () {
    function SavedCandidateBusiness() {
        this._savedCandidatesRepository = new SavedCandidatesRepository();
    }
    SavedCandidateBusiness.prototype.create = function (item, callback) {
        item._id = mongoose.Types.ObjectId();
        this._savedCandidatesRepository.create(item, callback);
    };
    SavedCandidateBusiness.prototype.retrieve = function (query, callback) {
        this._savedCandidatesRepository.retrieve(query, callback);
    };
    SavedCandidateBusiness.prototype.aggregate = function (query, callback) {
        this._savedCandidatesRepository.aggregate(query, callback);
    };
    SavedCandidateBusiness.prototype.retrieveFields = function (query, fields, callback) {
        this._savedCandidatesRepository.retrieveFields(query, fields, callback);
    };
    SavedCandidateBusiness.prototype.update = function (_id, item, callback) {
        var _this = this;
        this._savedCandidatesRepository.findById(_id, function (err, res) {
            if (err)
                callback(err, res);
            else
                _this._savedCandidatesRepository.update(res._id, item, callback);
        });
    };
    SavedCandidateBusiness.prototype.delete = function (_id, callback) {
        this._savedCandidatesRepository.delete(_id, callback);
    };
    SavedCandidateBusiness.prototype.deleteMany = function (query, callback) {
        this._savedCandidatesRepository.deleteMany(query, callback);
    };
    SavedCandidateBusiness.prototype.findById = function (_id, callback) {
        this._savedCandidatesRepository.findById(_id, callback);
    };
    SavedCandidateBusiness.prototype.count = function (query, callback) {
        this._savedCandidatesRepository.count(query, callback);
    };
    SavedCandidateBusiness.prototype.findOne = function (query, callback) {
        this._savedCandidatesRepository.findOne(query, callback);
    };
    return SavedCandidateBusiness;
}());
Object.seal(SavedCandidateBusiness);
module.exports = SavedCandidateBusiness;
//# sourceMappingURL=SavedCandidateBusiness.js.map