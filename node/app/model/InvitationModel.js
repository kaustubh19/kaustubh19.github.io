"use strict";
var InvitationModel = (function () {
    function InvitationModel(InvitationModel) {
        this._invitationModel = InvitationModel;
    }
    Object.defineProperty(InvitationModel.prototype, "_id", {
        get: function () {
            return this.invitationModel._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InvitationModel.prototype, "fullName", {
        get: function () {
            return this.invitationModel.fullName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InvitationModel.prototype, "email", {
        get: function () {
            return this.invitationModel.email;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InvitationModel.prototype, "userid", {
        get: function () {
            return this.invitationModel.userid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InvitationModel.prototype, "status", {
        get: function () {
            return this.invitationModel.status;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InvitationModel.prototype, "linkdinId", {
        get: function () {
            return this.invitationModel.linkdinId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InvitationModel.prototype, "websiteref", {
        get: function () {
            return this.invitationModel.websiteref;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InvitationModel.prototype, "token", {
        get: function () {
            return this.invitationModel.token;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InvitationModel.prototype, "createdOn", {
        get: function () {
            return this._userModel.createdOn;
        },
        enumerable: true,
        configurable: true
    });
    return InvitationModel;
}());
Object.seal(InvitationModel);
module.exports = InvitationModel;
//# sourceMappingURL=InvitationModel.js.map