"use strict";
var mongoose = require("mongoose");
var PagesRepository = require("./../repository/PagesRepository");
var PagesBusiness = (function () {
    function PagesBusiness() {
        this._pagesRepository = new PagesRepository();
    }
    PagesBusiness.prototype.create = function (item, callback) {
        item._id = mongoose.Types.ObjectId();
        this._pagesRepository.create(item, callback);
    };
    PagesBusiness.prototype.retrieve = function (query, callback) {
        this._pagesRepository.retrieve(query, callback);
    };
    PagesBusiness.prototype.aggregate = function (query, callback) {
        this._pagesRepository.aggregate(query, callback);
    };
    PagesBusiness.prototype.retrieveFields = function (query, fields, callback) {
        this._pagesRepository.retrieveFields(query, fields, callback);
    };
    PagesBusiness.prototype.update = function (_id, item, callback) {
        var _this = this;
        this._pagesRepository.findById(_id, function (err, res) {
            if (err)
                callback(err, res);
            else
                _this._pagesRepository.update(res._id, item, callback);
        });
    };
    PagesBusiness.prototype.delete = function (_id, callback) {
        this._pagesRepository.delete(_id, callback);
    };
    PagesBusiness.prototype.deleteMany = function (query, callback) {
        this._pagesRepository.deleteMany(query, callback);
    };
    PagesBusiness.prototype.findById = function (_id, callback) {
        this._pagesRepository.findById(_id, callback);
    };
    PagesBusiness.prototype.count = function (query, callback) {
        this._pagesRepository.count(query, callback);
    };
    PagesBusiness.prototype.findOne = function (query, callback) {
        this._pagesRepository.findOne(query, callback);
    };
    return PagesBusiness;
}());
Object.seal(PagesBusiness);
module.exports = PagesBusiness;
//# sourceMappingURL=PagesBusiness.js.map