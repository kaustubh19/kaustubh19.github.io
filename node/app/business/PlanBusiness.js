"use strict";
var mongoose = require("mongoose");
var PlanRepository = require("./../repository/PlanRepository");
var PlanBusiness = (function () {
    function PlanBusiness() {
        this._userRepository = new PlanRepository();
    }
    PlanBusiness.prototype.create = function (item, callback) {
        item._id = mongoose.Types.ObjectId();
        this._userRepository.create(item, callback);
    };
    PlanBusiness.prototype.retrieve = function (query, callback) {
        this._userRepository.retrieve(query, callback);
    };
    PlanBusiness.prototype.aggregate = function (query, callback) {
        this._userRepository.aggregate(query, callback);
    };
    PlanBusiness.prototype.retrieveFields = function (query, fields, callback) {
        this._userRepository.retrieveFields(query, fields, callback);
    };
    PlanBusiness.prototype.update = function (_id, item, callback) {
        var _this = this;
        this._userRepository.findById(_id, function (err, res) {
            if (err)
                callback(err, res);
            else
                _this._userRepository.update(res._id, item, callback);
        });
    };
    PlanBusiness.prototype.delete = function (_id, callback) {
        this._userRepository.delete(_id, callback);
    };
    PlanBusiness.prototype.deleteMany = function (query, callback) {
        this._userRepository.deleteMany(query, callback);
    };
    PlanBusiness.prototype.findById = function (_id, callback) {
        this._userRepository.findById(_id, callback);
    };
    PlanBusiness.prototype.count = function (query, callback) {
        this._userRepository.count(query, callback);
    };
    PlanBusiness.prototype.findOne = function (query, callback) {
        this._userRepository.findOne(query, callback);
    };
    return PlanBusiness;
}());
Object.seal(PlanBusiness);
module.exports = PlanBusiness;
//# sourceMappingURL=PlanBusiness.js.map