"use strict";
var SavedCandidatesModel = (function () {
    function SavedCandidatesModel(InvitationModel) {
        this._savedCandidatesModel = InvitationModel;
    }
    Object.defineProperty(SavedCandidatesModel.prototype, "_id", {
        get: function () {
            return this._savedCandidatesModel._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SavedCandidatesModel.prototype, "user_id", {
        get: function () {
            return this._savedCandidatesModel.user_id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SavedCandidatesModel.prototype, "candidate_id", {
        get: function () {
            return this._savedCandidatesModel.candidate_id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SavedCandidatesModel.prototype, "saved", {
        get: function () {
            return this._savedCandidatesModel.saved;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SavedCandidatesModel.prototype, "downloaded", {
        get: function () {
            return this._savedCandidatesModel.downloaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SavedCandidatesModel.prototype, "viewed", {
        get: function () {
            return this._savedCandidatesModel.viewed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SavedCandidatesModel.prototype, "paidOn", {
        get: function () {
            return this._savedCandidatesModel.paidOn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SavedCandidatesModel.prototype, "amount", {
        get: function () {
            return this._savedCandidatesModel.amount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SavedCandidatesModel.prototype, "createdOn", {
        get: function () {
            return this._savedCandidatesModel.createdOn;
        },
        enumerable: true,
        configurable: true
    });
    return SavedCandidatesModel;
}());
Object.seal(SavedCandidatesModel);
module.exports = SavedCandidatesModel;
//# sourceMappingURL=SavedCandidatesModel.js.map