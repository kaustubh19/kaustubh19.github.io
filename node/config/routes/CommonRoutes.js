"use strict";
/**
 * User related routes
 */
var express = require("express");
var CommonController = require("./../../controllers/CommonController");
var router = express.Router();
var CommonRoutes = (function () {
    function CommonRoutes() {
        this._commonController = new CommonController();
    }
    Object.defineProperty(CommonRoutes.prototype, "routes", {
        get: function () {
            var controller = this._commonController;
            console.log("in common routes");
            return router;
        },
        enumerable: true,
        configurable: true
    });
    return CommonRoutes;
}());
Object.seal(CommonRoutes);
module.exports = CommonRoutes;
//# sourceMappingURL=CommonRoutes.js.map