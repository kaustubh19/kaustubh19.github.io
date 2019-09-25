"use strict";
/**
 * Repository pattern implementation
 */
var _ = require('lodash');
var mongoose = require("mongoose");
var RepositoryBase = (function () {
    function RepositoryBase(schemaModel) {
        this._model = schemaModel;
    }
    RepositoryBase.prototype.create = function (item, callback) {
        this._model.create(item, callback);
    };
    RepositoryBase.prototype.retrieve = function (query, callback) {
        this._model.find(query, callback);
    };
    RepositoryBase.prototype.aggregate = function (query, callback) {
        this._model.aggregate(query, callback);
    };
    RepositoryBase.prototype.retrieveFields = function (query, fields, callback) {
        this._model.find(query).select(fields).exec(callback);
    };
    RepositoryBase.prototype.update = function (_id, item, callback) {
        this._model.update({ _id: _id }, _.omit(item, '_id'), callback);
    };
    RepositoryBase.prototype.updateMany = function (query, item, multi, callback) {
        this._model.update(query, _.omit(item, '_id'), multi, callback);
    };
    RepositoryBase.prototype.delete = function (_id, callback) {
        this._model.remove({ _id: this.toObjectId(_id) }, function (err) { return callback(err, null); });
    };
    RepositoryBase.prototype.deleteMany = function (query, callback) {
        this._model.deleteMany(query, function (err) { return callback(err, null); });
    };
    RepositoryBase.prototype.findById = function (_id, callback) {
        this._model.findById(_id, callback);
    };
    RepositoryBase.prototype.toObjectId = function (_id) {
        return mongoose.Types.ObjectId.createFromHexString(_id);
    };
    //added for finding 1st record for passed column name and value in the query fr example {'email':<emailval>}
    RepositoryBase.prototype.count = function (query, callback) {
        this._model.count(query, callback);
    };
    RepositoryBase.prototype.findOne = function (query, callback) {
        this._model.findOne(query, callback);
    };
    return RepositoryBase;
}());
module.exports = RepositoryBase;
//# sourceMappingURL=BaseRepository.js.map