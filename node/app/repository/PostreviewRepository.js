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
var PostreviewSchema = require("./../dataAccess/schemas/PostreviewSchema");
var RepositoryBase = require("./BaseRepository");
var PostreviewRepository = (function (_super) {
    __extends(PostreviewRepository, _super);
    function PostreviewRepository() {
        return _super.call(this, PostreviewSchema) || this;
    }
    return PostreviewRepository;
}(RepositoryBase));
Object.seal(PostreviewRepository);
module.exports = PostreviewRepository;
//# sourceMappingURL=PostreviewRepository.js.map