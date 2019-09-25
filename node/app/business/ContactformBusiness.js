"use strict";
var mongoose = require("mongoose");
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var ContactformRepository = require("./../repository/ContactformRepository");
var ContactformBusiness = (function () {
    function ContactformBusiness() {
        this._contactformRepository = new ContactformRepository();
    }
    ContactformBusiness.prototype.create = function (item, callback) {
        item._id = mongoose.Types.ObjectId();
        this._contactformRepository.create(item, callback);
    };
    ContactformBusiness.prototype.retrieve = function (query, callback) {
        this._contactformRepository.retrieve(query, callback);
    };
    ContactformBusiness.prototype.aggregate = function (query, callback) {
        this._contactformRepository.aggregate(query, callback);
    };
    ContactformBusiness.prototype.retrieveFields = function (query, fields, callback) {
        this._contactformRepository.retrieveFields(query, fields, callback);
    };
    ContactformBusiness.prototype.update = function (_id, item, callback) {
        var _this = this;
        this._contactformRepository.findById(_id, function (err, res) {
            if (err)
                callback(err, res);
            else
                _this._contactformRepository.update(res._id, item, callback);
        });
    };
    ContactformBusiness.prototype.delete = function (_id, callback) {
        this._contactformRepository.delete(_id, callback);
    };
    ContactformBusiness.prototype.deleteMany = function (query, callback) {
        this._contactformRepository.deleteMany(query, callback);
    };
    ContactformBusiness.prototype.findById = function (_id, callback) {
        this._contactformRepository.findById(_id, callback);
    };
    ContactformBusiness.prototype.count = function (query, callback) {
        this._contactformRepository.count(query, callback);
    };
    ContactformBusiness.prototype.findOne = function (query, callback) {
        this._contactformRepository.findOne(query, callback);
    };
    return ContactformBusiness;
}());
Object.seal(ContactformBusiness);
module.exports = ContactformBusiness;
//# sourceMappingURL=ContactformBusiness.js.map