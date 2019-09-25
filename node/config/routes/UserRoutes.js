"use strict";
/**
 * User related routes
 */
var express = require("express");
var UserController = require("./../../controllers/UserController");
var router = express.Router();
var UserRoutes = (function () {
    function UserRoutes() {
        this._userController = new UserController();
    }
    Object.defineProperty(UserRoutes.prototype, "routes", {
        get: function () {
            var controller = this._userController;
            router.get("/users", controller.retrieve);
            router.post("/contentPage", controller.Pagesretrieve);
            router.post("/users", controller.create);
            router.put("/hrUpdate", controller.UpdateHr);
            router.put("/savedCandidates", controller.SavedCandidates);
            router.put("/viewdCandidates", controller.viewdCandidates);
            router.post("/users/postreveiw", controller.postReviews);
            router.get("/getSavedCandidates", controller.getSavedCandidates);
            router.get("/getdownloadedby/:_id", controller.getdownloadedby);
            router.put("/users/:_id", controller.update);
            router.put("/updateStatus", controller.updateStatus);
            router.put("/updateCandidateAmount", controller.updateCandidateAmount);
            router.get("/users/:_id", controller.findById);
            router.get("/users-bytoken", controller.findByToken);
            router.get("/users/getEmailExists/:query", controller.getEmailExists);
            router.post("/users/register", controller.register);
            router.post("/users/authenticate", controller.authenticate);
            router.post("/users/verifytoken", controller.verifytoken);
            router.delete("/users/:_id/:_flag", controller.delete);
            router.get("/users/getKeyword/:query", controller.getKeyword);
            router.post("/users/forgetUserPassword", controller.forgetUserPassword);
            router.post("/users/forgetSAdminPassword", controller.forgetSAdminPassword);
            router.post("/users/contactForm", controller.contactForm);
            router.post("/users/sendinvite", controller.sendinvite);
            router.post("/users/deleteprofilepic", controller.deleteprofilepic);
            router.post("/users/deleteprofileCover", controller.deleteprofileCover);
            router.post("/users/UpdateUserPassword", controller.UpdateUserPassword);
            router.post("/users/getinvitation", controller.getinvitation);
            router.post("/users/getinvitationKey", controller.getinvitationKey);
            router.post("/users/advancesearch", controller.advanceSearch);
            router.post("/users/getReferences", controller.getReferences);
            return router;
        },
        enumerable: true,
        configurable: true
    });
    return UserRoutes;
}());
Object.seal(UserRoutes);
module.exports = UserRoutes;
//# sourceMappingURL=UserRoutes.js.map