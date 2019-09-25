"use strict";
var mongoose = require("mongoose");
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var AdminUserRepository = require("./../repository/AdminUserRepository");
var AdminUserBusiness = (function () {
    function AdminUserBusiness() {
        this._adminUserRepository = new AdminUserRepository();
    }
    AdminUserBusiness.prototype.create = function (item, callback) {
        console.log("in adminUser  business create");
        console.log(item);
        item._id = mongoose.Types.ObjectId();
        this._adminUserRepository.create(item, callback);
    };
    AdminUserBusiness.prototype.retrieve = function (query, callback) {
        this._adminUserRepository.retrieve(query, callback);
    };
    AdminUserBusiness.prototype.aggregate = function (query, callback) {
        this._adminUserRepository.aggregate(query, callback);
    };
    AdminUserBusiness.prototype.retrieveFields = function (query, fields, callback) {
        this._adminUserRepository.retrieveFields(query, fields, callback);
    };
    AdminUserBusiness.prototype.update = function (_id, item, callback) {
        var _this = this;
        this._adminUserRepository.findById(_id, function (err, res) {
            if (err)
                callback(err, res);
            else
                _this._adminUserRepository.update(res._id, item, callback);
        });
    };
    AdminUserBusiness.prototype.delete = function (_id, callback) {
        this._adminUserRepository.delete(_id, callback);
    };
    AdminUserBusiness.prototype.deleteMany = function (query, callback) {
        this._adminUserRepository.deleteMany(query, callback);
    };
    AdminUserBusiness.prototype.findById = function (_id, callback) {
        this._adminUserRepository.findById(_id, callback);
    };
    AdminUserBusiness.prototype.count = function (query, callback) {
        this._adminUserRepository.count(query, callback);
    };
    AdminUserBusiness.prototype.findOne = function (query, callback) {
        this._adminUserRepository.findOne(query, callback);
    };
    AdminUserBusiness.prototype.createToken = function (user) {
        //expiresIn seconds
        return jwt.sign({ email: user.email }, '93c7ec1855c74462f00a62degecaef8d', { expiresIn: 60 * 60 * 5 });
    };
    AdminUserBusiness.prototype.verifyToken = function (req, res, callback) {
        //		console.log('Admin: ' + req.url);
        var token = req.headers.authorization;
        var origin = req.headers.origin;
        if (!token) {
            res.status(400);
            res.json({
                "error": "Bad Data"
            });
        }
        else {
            this._adminUserRepository.findOne({ token: token }, function (err, companyUserData) {
                if (err) {
                    res.status(401).send("Invalid token");
                }
                else {
                    console.log(companyUserData);
                    if (companyUserData && companyUserData.isActive && companyUserData.email != "") {
                        callback(companyUserData);
                    }
                    else {
                        res.status(401).send("Invalid token");
                    }
                }
            });
        }
    };
    return AdminUserBusiness;
}());
Object.seal(AdminUserBusiness);
module.exports = AdminUserBusiness;
//# sourceMappingURL=AdminUserBusiness.js.map