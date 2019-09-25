"use strict";
/**
 * company schema for collections: companies
 */
var DataAccess = require("../DataAccess");
var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;
var AdminUserSchema = (function () {
    function AdminUserSchema() {
    }
    Object.defineProperty(AdminUserSchema, "schema", {
        get: function () {
            var schema = mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                firstName: {
                    type: String,
                    required: true
                },
                lastName: {
                    type: String
                },
                email: {
                    type: String,
                    required: true,
                    unique: true
                },
                password: {
                    type: String,
                    required: true
                },
                lastLogin: {
                    type: Date
                },
                token: {
                    type: String
                },
                isActive: {
                    type: Boolean
                }
            });
            return schema;
        },
        enumerable: true,
        configurable: true
    });
    return AdminUserSchema;
}());
// we need to create a model using it
var AdminUserModel = mongooseConnection.model("Admin_Users", AdminUserSchema.schema);
module.exports = AdminUserModel;
//# sourceMappingURL=AdminUserSchema.js.map