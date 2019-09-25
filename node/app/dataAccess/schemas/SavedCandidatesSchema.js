"use strict";
/**
 * company schema for collections: companies
 */
var DataAccess = require("../DataAccess");
var Users = require("./UserSchema");
var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;
var SavedCandidatesSchema = (function () {
    function SavedCandidatesSchema() {
    }
    Object.defineProperty(SavedCandidatesSchema, "schema", {
        get: function () {
            var schema = mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                user_id: {
                    type: mongoose.Schema.Types.ObjectId, ref: Users
                },
                candidate_id: {
                    type: mongoose.Schema.Types.ObjectId
                },
                saved: {
                    type: String
                },
                downloaded: {
                    type: String
                },
                viewed: {
                    type: String
                },
                paidOn: {
                    type: Boolean
                },
                amount: {
                    type: String
                },
                createdOn: {
                    type: Date
                }
            });
            return schema;
        },
        enumerable: true,
        configurable: true
    });
    return SavedCandidatesSchema;
}());
// we need to create a model using it
var SavedCandidatesModel = mongooseConnection.model("saved_candidates", SavedCandidatesSchema.schema);
module.exports = SavedCandidatesModel;
//# sourceMappingURL=SavedCandidatesSchema.js.map