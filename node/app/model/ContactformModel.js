"use strict";
/**
 * Address Model used by other models like AddressModel
 */
var ContactformModel = require("./interfaces/IContactformModel");
var ContactformModel = (function () {
    function ContactformModel(ContactformModel) {
        this._ContactformModel = ContactformModel;
    }
    Object.defineProperty(ContactformModel.prototype, "fullname", {
        get: function () {
            return this._ContactformModel.fullname;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactformModel.prototype, "email", {
        get: function () {
            return this._ContactformModel.email;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactformModel.prototype, "phone", {
        get: function () {
            return this._ContactformModel.phone;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactformModel.prototype, "message", {
        get: function () {
            return this._ContactformModel.message;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactformModel.prototype, "createdOn", {
        get: function () {
            return this._ContactformModel.createdOn;
        },
        enumerable: true,
        configurable: true
    });
    return ContactformModel;
}());
Object.seal(ContactformModel);
module.exports = ContactformModel;
//# sourceMappingURL=ContactformModel.js.map