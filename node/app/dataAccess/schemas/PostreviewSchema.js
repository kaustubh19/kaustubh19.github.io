"use strict";
/**
 * company schema for collections: companies
 */
var DataAccess = require("../DataAccess");
var Users = require("./UserSchema");
var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;
var PostreviewSchema = (function () {
    function PostreviewSchema() {
    }
    Object.defineProperty(PostreviewSchema, "schema", {
        get: function () {
            var schema = mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                fullname: {
                    type: String,
                    required: true
                },
                email: {
                    type: String,
                    required: true
                },
                company: {
                    type: String
                },
                candidatereport: {
                    type: String,
                    required: true,
                },
                communication: {
                    type: String,
                    required: true,
                },
                ownership: {
                    type: String,
                    required: true,
                },
                selfdrive: {
                    type: String,
                    required: true,
                },
                technicalexp: {
                    type: Object,
                    required: true,
                },
                strengths: {
                    type: String,
                    required: true,
                },
                improvment: {
                    type: String,
                    required: true,
                },
                userId: {
                    type: mongoose.Schema.Types.ObjectId, ref: Users
                },
                postuserId: {
                    type: String,
                    required: true,
                },
                overall: {
                    type: String,
                    required: true,
                },
                status: {
                    type: String,
                    required: true,
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
    return PostreviewSchema;
}());
// we need to create a model using it
var PostreviewModel = mongooseConnection.model("Postreview", PostreviewSchema.schema);
module.exports = PostreviewModel;
//# sourceMappingURL=PostreviewSchema.js.map