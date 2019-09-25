"use strict";
/**
 * Business Logic for EmployeBusiness, called from the Controllers
 */
var mongoose = require("mongoose");
var EmployeeRepository = require("./../repository/EmployeeRepository");
var EmployeeBusiness = (function () {
    function EmployeeBusiness() {
        this._employeeRepository = new EmployeeRepository();
    }
    EmployeeBusiness.prototype.create = function (item, callback) {
        item._id = mongoose.Types.ObjectId();
        this._employeeRepository.create(item, callback);
    };
    EmployeeBusiness.prototype.aggregate = function (query, callback) {
        this._employeeRepository.aggregate(query, callback);
    };
    EmployeeBusiness.prototype.retrieve = function (query, callback) {
        this._employeeRepository.retrieve(query, callback);
    };
    EmployeeBusiness.prototype.retrieveFields = function (query, fields, callback) {
        this._employeeRepository.retrieveFields(query, fields, callback);
    };
    EmployeeBusiness.prototype.update = function (_id, item, callback) {
        var _this = this;
        this._employeeRepository.findById(_id, function (err, res) {
            if (err)
                callback(err, res);
            else
                _this._employeeRepository.update(res._id, item, callback);
        });
    };
    EmployeeBusiness.prototype.delete = function (_id, callback) {
        this._employeeRepository.delete(_id, callback);
    };
    EmployeeBusiness.prototype.deleteMany = function (query, callback) {
        this._employeeRepository.deleteMany(query, callback);
    };
    EmployeeBusiness.prototype.findById = function (_id, callback) {
        this._employeeRepository.findById(_id, callback);
    };
    EmployeeBusiness.prototype.findOne = function (query, callback) {
        this._employeeRepository.findOne(query, callback);
    };
    EmployeeBusiness.prototype.count = function (query, callback) {
        this._employeeRepository.count(query, callback);
    };
    return EmployeeBusiness;
}());
Object.seal(EmployeeBusiness);
module.exports = EmployeeBusiness;
//# sourceMappingURL=EmployeeBusiness.js.map