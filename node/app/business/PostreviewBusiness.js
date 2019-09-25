"use strict";
var mongoose = require("mongoose");
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var PostreviewRepository = require("./../repository/PostreviewRepository");
var PostreviewBusiness = (function () {
    function PostreviewBusiness() {
        this._postreviewRepository = new PostreviewRepository();
    }
    PostreviewBusiness.prototype.create = function (item, callback) {
        item._id = mongoose.Types.ObjectId();
        this._postreviewRepository.create(item, callback);
    };
    PostreviewBusiness.prototype.retrieve = function (query, callback) {
        this._postreviewRepository.retrieve(query, callback);
    };
    PostreviewBusiness.prototype.aggregate = function (query, callback) {
        this._postreviewRepository.aggregate(query, callback);
    };
    PostreviewBusiness.prototype.retrieveFields = function (query, fields, callback) {
        this._postreviewRepository.retrieveFields(query, fields, callback);
    };
    PostreviewBusiness.prototype.update = function (_id, item, callback) {
        var _this = this;
        this._postreviewRepository.findById(_id, function (err, res) {
            if (err)
                callback(err, res);
            else
                _this._postreviewRepository.update(res._id, item, callback);
        });
    };
    PostreviewBusiness.prototype.delete = function (_id, callback) {
        this._postreviewRepository.delete(_id, callback);
    };
    PostreviewBusiness.prototype.deleteMany = function (query, callback) {
        this._postreviewRepository.deleteMany(query, callback);
    };
    PostreviewBusiness.prototype.findById = function (_id, callback) {
        this._postreviewRepository.findById(_id, callback);
    };
    PostreviewBusiness.prototype.count = function (query, callback) {
        this._postreviewRepository.count(query, callback);
    };
    PostreviewBusiness.prototype.findOne = function (query, callback) {
        this._postreviewRepository.findOne(query, callback);
    };
    return PostreviewBusiness;
}());
Object.seal(PostreviewBusiness);
module.exports = PostreviewBusiness;
//# sourceMappingURL=PostreviewBusiness.js.map