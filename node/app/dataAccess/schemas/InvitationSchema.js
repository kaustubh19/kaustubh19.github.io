"use strict";
/**
 * company schema for collections: companies
 */
var DataAccess = require("../DataAccess");
var Users = require("./UserSchema");
var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;
var InvitationSchema = (function () {
    function InvitationSchema() {
    }
    Object.defineProperty(InvitationSchema, "schema", {
        get: function () {
            var schema = mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                fullName: {
                    type: String,
                    required: true
                },
                email: {
                    type: String,
                    required: true,
                    unique: true
                },
                userId: {
                    type: mongoose.Schema.Types.ObjectId, ref: Users
                },
                status: {
                    type: String
                },
                linkdinId: {
                    type: String
                },
                websiteref: {
                    type: String
                },
                token: {
                    type: String
                },
                createdOn: {
                    type: Date,
                    required: true
                },
            });
            return schema;
        },
        enumerable: true,
        configurable: true
    });
    return InvitationSchema;
}());
// we need to create a model using it
var InvitationModel = mongooseConnection.model("Invitations", InvitationSchema.schema);
module.exports = InvitationModel;
//# sourceMappingURL=InvitationSchema.js.map