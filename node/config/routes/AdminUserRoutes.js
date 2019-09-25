"use strict";
/**
 * User related routes
 */
var express = require("express");
var AdminUserController = require("./../../controllers/AdminUserController");
var router = express.Router();
var AdminUserRoutes = (function () {
    function AdminUserRoutes() {
        this._adminUserController = new AdminUserController();
    }
    Object.defineProperty(AdminUserRoutes.prototype, "routes", {
        get: function () {
            var controller = this._adminUserController;
            router.get("/adminusers/plan", controller.getPlans);
            router.get("/adminusers/getContent", controller.getContent);
            router.get("/adminusers/:_flag", controller.allcandidate);
            router.put("/adminusers/", controller.update);
            router.delete("/adminusers/:_id", controller.deleteusers);
            router.get("/userStatus/:_id", controller.userStatus);
            router.get("/adminusers/:_id", controller.findById);
            router.post("/adminusers/PlanRegister", controller.PlanRegister);
            router.get("/adminusers", controller.getDashboardData);
            router.get("/adminusers-bytoken", controller.findByToken);
            router.get("/adminusers-get-billing-detail", controller.getBillingDetail);
            router.get("/adminusers/count/:query", controller.count);
            router.post("/adminusers/authenticate", controller.authenticate);
            router.post("/adminusers/verifytoken", controller.verifytoken);
            router.put("/adminusers/change-password", controller.changePassword);
            router.post("/adminusers/updateContent", controller.updateContent);
            return router;
        },
        enumerable: true,
        configurable: true
    });
    return AdminUserRoutes;
}());
Object.seal(AdminUserRoutes);
module.exports = AdminUserRoutes;
//# sourceMappingURL=AdminUserRoutes.js.map