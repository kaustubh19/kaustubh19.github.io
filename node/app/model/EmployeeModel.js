"use strict";
/**
 * Employe model
 */
var EmployeeModel = (function () {
    function EmployeeModel(EmployeeModel) {
        this._employeeModel = EmployeeModel;
    }
    Object.defineProperty(EmployeeModel.prototype, "_id", {
        get: function () {
            return this._employeeModel._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "userId", {
        get: function () {
            return this._employeeModel.userId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "gender", {
        get: function () {
            return this._employeeModel.gender;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "dateofBirth", {
        get: function () {
            return this._employeeModel.dateofBirth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "summary", {
        get: function () {
            return this._employeeModel.summary;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "social_media", {
        get: function () {
            return this._employeeModel.social_media;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "defoultsocial_media", {
        get: function () {
            return this._employeeModel.defoultsocial_media;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "currentlyEmployed", {
        get: function () {
            return this._employeeModel.defoultsocial_media;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "professionalSummary", {
        get: function () {
            return this._employeeModel.professionalSummary;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "currentsalaryflag", {
        get: function () {
            return this._employeeModel.currentsalaryflag;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "expectedsalaryflag", {
        get: function () {
            return this._employeeModel.expectedsalaryflag;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "permanentaddressFlag", {
        get: function () {
            return this._employeeModel.permanentaddressFlag;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "currentSalary", {
        get: function () {
            return this._employeeModel.currentSalary;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "expectedSalary", {
        get: function () {
            return this._employeeModel.expectedSalary;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "openRelocation", {
        get: function () {
            return this._employeeModel.openRelocation;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "openTravel", {
        get: function () {
            return this._employeeModel.openTravel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "authorization", {
        get: function () {
            return this._employeeModel.authorization;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "felony", {
        get: function () {
            return this._employeeModel.felony;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "experienceYear", {
        get: function () {
            return this._employeeModel.experienceYear;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "experienceMonth", {
        get: function () {
            return this._employeeModel.experienceMonth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "phone", {
        get: function () {
            return this._employeeModel.phone;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "alternateMobile_number", {
        get: function () {
            return this._employeeModel.alternateMobile_number;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "alternateEmail", {
        get: function () {
            return this._employeeModel.alternateEmail;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "education", {
        get: function () {
            return this._employeeModel.education;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "skills", {
        get: function () {
            return this._employeeModel.skills;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "strengths", {
        get: function () {
            return this._employeeModel.strengths;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "improvements", {
        get: function () {
            return this._employeeModel.improvements;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "profileCover", {
        get: function () {
            return this._employeeModel.profileCover;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "designation", {
        get: function () {
            return this._employeeModel.designation;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "profilePic", {
        get: function () {
            return this._employeeModel.profilePic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "currentaddress", {
        get: function () {
            return this._employeeModel.currentaddress;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "permanentaddress", {
        get: function () {
            return this._employeeModel.permanentaddress;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "resume", {
        get: function () {
            return this._employeeModel.resume;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "totaloverall", {
        get: function () {
            return this._employeeModel.totaloverall;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "createdDate", {
        get: function () {
            return this._employeeModel.createdDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeModel.prototype, "updatedDate", {
        get: function () {
            return this._employeeModel.updatedDate;
        },
        enumerable: true,
        configurable: true
    });
    return EmployeeModel;
}());
Object.seal(EmployeeModel);
module.exports = EmployeeModel;
//# sourceMappingURL=EmployeeModel.js.map