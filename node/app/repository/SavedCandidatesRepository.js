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
var SavedCandidatesSchema = require("./../dataAccess/schemas/SavedCandidatesSchema");
var RepositoryBase = require("./BaseRepository");
var SavedCandidatesRepository = (function (_super) {
    __extends(SavedCandidatesRepository, _super);
    function SavedCandidatesRepository() {
        return _super.call(this, SavedCandidatesSchema) || this;
    }
    return SavedCandidatesRepository;
}(RepositoryBase));
Object.seal(SavedCandidatesRepository);
module.exports = SavedCandidatesRepository;
//# sourceMappingURL=SavedCandidatesRepository.js.map