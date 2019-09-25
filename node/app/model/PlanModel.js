"use strict";
var PlanModel = (function () {
    function PlanModel(PlanModel) {
        this._planModel = PlanModel;
    }
    Object.defineProperty(PlanModel.prototype, "_id", {
        get: function () {
            return this._planModel._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlanModel.prototype, "plan", {
        get: function () {
            return this._planModel.plan;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlanModel.prototype, "plan_name", {
        get: function () {
            return this._palnModel.plan_name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlanModel.prototype, "experience_one", {
        get: function () {
            return this._planModel.experience_one;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlanModel.prototype, "experience_two", {
        get: function () {
            return this._planModel.experience_two;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlanModel.prototype, "experience_three", {
        get: function () {
            return this._planModel.experience_three;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlanModel.prototype, "createdOn", {
        get: function () {
            return this._planModel.createdOn;
        },
        enumerable: true,
        configurable: true
    });
    return PlanModel;
}());
Object.seal(PlanModel);
module.exports = PlanModel;
//# sourceMappingURL=PlanModel.js.map