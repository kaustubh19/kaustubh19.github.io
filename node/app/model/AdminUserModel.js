"use strict";
var AdminUserModel = (function () {
    function AdminUserModel(AdminUserModel) {
        this._userModel = AdminUserModel;
    }
    Object.defineProperty(AdminUserModel.prototype, "_id", {
        get: function () {
            return this._userModel._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdminUserModel.prototype, "firstName", {
        get: function () {
            return this._userModel.firstName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdminUserModel.prototype, "lastName", {
        get: function () {
            return this._userModel.lastName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdminUserModel.prototype, "email", {
        get: function () {
            return this._userModel.email;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdminUserModel.prototype, "password", {
        get: function () {
            return this._userModel.password;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdminUserModel.prototype, "lastLogin", {
        get: function () {
            return this._userModel.lastLogin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdminUserModel.prototype, "token", {
        get: function () {
            return this._userModel.token;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdminUserModel.prototype, "isActive", {
        get: function () {
            return this._userModel.isActive;
        },
        enumerable: true,
        configurable: true
    });
    return AdminUserModel;
}());
Object.seal(AdminUserModel);
module.exports = AdminUserModel;
//# sourceMappingURL=AdminUserModel.js.map