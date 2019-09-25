"use strict";
var ProfessionalModel = (function () {
    function ProfessionalModel(ProfessionalModel) {
        this._ProfessionalModel = ProfessionalModel;
    }
    Object.defineProperty(ProfessionalModel.prototype, "company_name", {
        get: function () {
            return this._ProfessionalModel.company_name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfessionalModel.prototype, "technology", {
        get: function () {
            return this._ProfessionalModel.technology;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfessionalModel.prototype, "department", {
        get: function () {
            return this._ProfessionalModel.department;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfessionalModel.prototype, "duration", {
        get: function () {
            return this._ProfessionalModel.duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfessionalModel.prototype, "project_details", {
        get: function () {
            return this._ProfessionalModel.project_details;
        },
        enumerable: true,
        configurable: true
    });
    return ProfessionalModel;
}());
Object.seal(ProfessionalModel);
module.exports = ProfessionalModel;
//# sourceMappingURL=ProfessionalModel.js.map