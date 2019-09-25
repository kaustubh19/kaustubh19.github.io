"use strict";
var AddressModel = (function () {
    function AddressModel(AddressModel) {
        this._AddressModel = AddressModel;
    }
    Object.defineProperty(AddressModel.prototype, "street", {
        get: function () {
            return this._AddressModel.street;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddressModel.prototype, "building", {
        get: function () {
            return this._AddressModel.building;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddressModel.prototype, "city", {
        get: function () {
            return this._AddressModel.city;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddressModel.prototype, "state", {
        get: function () {
            return this._AddressModel.state;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddressModel.prototype, "country", {
        get: function () {
            return this._AddressModel.country;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddressModel.prototype, "timezone", {
        get: function () {
            return this._AddressModel.timezone;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddressModel.prototype, "postCode", {
        get: function () {
            return this._AddressModel.postCode;
        },
        enumerable: true,
        configurable: true
    });
    return AddressModel;
}());
Object.seal(AddressModel);
module.exports = AddressModel;
//# sourceMappingURL=AddressModel.js.map