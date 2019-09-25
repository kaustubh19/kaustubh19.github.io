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
var ContactformSchema = require("./../dataAccess/schemas/ContactformSchema");
var RepositoryBase = require("./BaseRepository");
var ContactformRepository = (function (_super) {
    __extends(ContactformRepository, _super);
    function ContactformRepository() {
        return _super.call(this, ContactformSchema) || this;
    }
    return ContactformRepository;
}(RepositoryBase));
Object.seal(ContactformRepository);
module.exports = ContactformRepository;
//# sourceMappingURL=ContactformRepository.js.map