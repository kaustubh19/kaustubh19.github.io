"use strict";
var UserModel = (function () {
    function UserModel(UserModel) {
        this._userModel = UserModel;
    }
    Object.defineProperty(UserModel.prototype, "_id", {
        get: function () {
            return this._userModel._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "firstName", {
        get: function () {
            return this._userModel.firstName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "lastName", {
        get: function () {
            return this._userModel.lastName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "middleName", {
        get: function () {
            return this._userModel.middleName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "email", {
        get: function () {
            return this._userModel.email;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "password", {
        get: function () {
            return this._userModel.password;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "companyName", {
        get: function () {
            return this._userModel.companyName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "previouscompanyName", {
        get: function () {
            return this._userModel.previouscompanyName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "roles", {
        get: function () {
            return this._userModel.roles;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "lastLogin", {
        get: function () {
            return this._userModel.lastLogin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "token", {
        get: function () {
            return this._userModel.token;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "status", {
        get: function () {
            return this._userModel.status;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "paidExpirydate", {
        get: function () {
            return this._userModel.paidExpirydate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "paidOn", {
        get: function () {
            return this._userModel.paidOn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "hrpaidOn", {
        get: function () {
            return this._userModel.hrpaidOn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "amount", {
        get: function () {
            return this._userModel.amount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "linkdinId", {
        get: function () {
            return this._userModel.linkdinId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "createdOn", {
        get: function () {
            return this._userModel.createdOn;
        },
        enumerable: true,
        configurable: true
    });
    return UserModel;
}());
Object.seal(UserModel);
module.exports = UserModel;
//# sourceMappingURL=UserModel.js.map