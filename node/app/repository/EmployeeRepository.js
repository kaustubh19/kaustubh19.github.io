"use strict";
/**
 * Employee model repository
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EmployeeSchema = require("./../dataAccess/schemas/EmployeeSchema");
var RepositoryBase = require("./BaseRepository");
var EmployeeRepository = (function (_super) {
    __extends(EmployeeRepository, _super);
    function EmployeeRepository() {
        return _super.call(this, EmployeeSchema) || this;
    }
    return EmployeeRepository;
}(RepositoryBase));
Object.seal(EmployeeRepository);
module.exports = EmployeeRepository;
//# sourceMappingURL=EmployeeRepository.js.map