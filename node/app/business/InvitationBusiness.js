"use strict";
var mongoose = require("mongoose");
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var InvitationRepository = require("./../repository/InvitationRepository");
var InvitationBusiness = (function () {
    function InvitationBusiness() {
        this._invitationRepository = new InvitationRepository();
    }
    InvitationBusiness.prototype.create = function (item, callback) {
        item._id = mongoose.Types.ObjectId();
        this._invitationRepository.create(item, callback);
    };
    InvitationBusiness.prototype.retrieve = function (query, callback) {
        this._invitationRepository.retrieve(query, callback);
    };
    InvitationBusiness.prototype.aggregate = function (query, callback) {
        this._invitationRepository.aggregate(query, callback);
    };
    InvitationBusiness.prototype.retrieveFields = function (query, fields, callback) {
        this._invitationRepository.retrieveFields(query, fields, callback);
    };
    InvitationBusiness.prototype.update = function (_id, item, callback) {
        var _this = this;
        this._invitationRepository.findById(_id, function (err, res) {
            if (err)
                callback(err, res);
            else
                _this._invitationRepository.update(res._id, item, callback);
        });
    };
    InvitationBusiness.prototype.delete = function (_id, callback) {
        this._invitationRepository.delete(_id, callback);
    };
    InvitationBusiness.prototype.deleteMany = function (query, callback) {
        this._invitationRepository.deleteMany(query, callback);
    };
    InvitationBusiness.prototype.findById = function (_id, callback) {
        this._invitationRepository.findById(_id, callback);
    };
    InvitationBusiness.prototype.count = function (query, callback) {
        this._invitationRepository.count(query, callback);
    };
    InvitationBusiness.prototype.findOne = function (query, callback) {
        this._invitationRepository.findOne(query, callback);
    };
    return InvitationBusiness;
}());
Object.seal(InvitationBusiness);
module.exports = InvitationBusiness;
//# sourceMappingURL=InvitationBusiness.js.map