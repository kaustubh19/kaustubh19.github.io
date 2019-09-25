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
var AdminUserSchema = require("./../dataAccess/schemas/AdminUserSchema");
var RepositoryBase = require("./BaseRepository");
var AdminUserRepository = (function (_super) {
    __extends(AdminUserRepository, _super);
    function AdminUserRepository() {
        return _super.call(this, AdminUserSchema) || this;
    }
    return AdminUserRepository;
}(RepositoryBase));
Object.seal(AdminUserRepository);
module.exports = AdminUserRepository;
//# sourceMappingURL=AdminUserRepository.js.map