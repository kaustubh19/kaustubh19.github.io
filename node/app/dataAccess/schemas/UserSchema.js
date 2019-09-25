"use strict";
/**
 * company schema for collections: companies
 */
var DataAccess = require("../DataAccess");
var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;
var UserSchema = (function () {
    function UserSchema() {
    }
    Object.defineProperty(UserSchema, "schema", {
        get: function () {
            var schema = mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                firstName: {
                    type: String,
                    required: true
                },
                lastName: {
                    type: String,
                    required: true
                },
                middleName: {
                    type: String
                },
                email: {
                    type: String,
                    required: true,
                    unique: true
                },
                password: {
                    type: String
                },
                companyName: {
                    type: String
                },
                previouscompanyName: {
                    type: String
                },
                roles: {
                    type: String,
                    required: true
                },
                lastLogin: {
                    type: Date
                },
                token: {
                    type: String
                },
                status: {
                    type: String
                },
                paidExpirydate: {
                    type: Date
                },
                paidOn: {
                    type: Boolean
                },
                hrpaidOn: {
                    type: Boolean
                },
                amount: {
                    type: String
                },
                linkdinId: {
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
    return UserSchema;
}());
// we need to create a model using it
var UserModel = mongooseConnection.model("Users", UserSchema.schema);
module.exports = UserModel;
//# sourceMappingURL=UserSchema.js.map