"use strict";
/**
 * inteleagent routes
 */
var express = require("express");
var UserRoutes = require("../routes/UserRoutes");
var AdminUserRoutes = require("../routes/AdminUserRoutes");
var CommonRoutes = require("../routes/CommonRoutes");
var app = express();
var Routes = (function () {
    function Routes() {
    }
    Object.defineProperty(Routes.prototype, "routes", {
        get: function () {
            /* api is getting prefixed in the server js file and specific route like applications in the applicationroute file */
            app.use("/", new UserRoutes().routes);
            app.use("/", new AdminUserRoutes().routes);
            app.use("/", new CommonRoutes().routes);
            return app;
        },
        enumerable: true,
        configurable: true
    });
    return Routes;
}());
module.exports = Routes;
//# sourceMappingURL=Routes.js.map