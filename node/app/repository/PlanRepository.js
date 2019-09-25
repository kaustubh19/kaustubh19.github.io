"use strict";
/**
 * application model repository
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
var PlanSchema = require("./../dataAccess/schemas/PlanSchema");
var RepositoryBase = require("./BaseRepository");
var PlanRepository = (function (_super) {
    __extends(PlanRepository, _super);
    function PlanRepository() {
        return _super.call(this, PlanSchema) || this;
    }
    return PlanRepository;
}(RepositoryBase));
Object.seal(PlanRepository);
module.exports = PlanRepository;
//# sourceMappingURL=PlanRepository.js.map