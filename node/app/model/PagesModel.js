"use strict";
var PagesModel = (function () {
    function PagesModel(PagesModel) {
        this._pagesModel = PagesModel;
    }
    Object.defineProperty(PagesModel.prototype, "_id", {
        get: function () {
            return this._pagesModel._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagesModel.prototype, "page", {
        get: function () {
            return this._pagesModel.page;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagesModel.prototype, "content", {
        get: function () {
            return this._pagesModel.content;
        },
        enumerable: true,
        configurable: true
    });
    return PagesModel;
}());
Object.seal(PagesModel);
module.exports = PagesModel;
//# sourceMappingURL=PagesModel.js.map