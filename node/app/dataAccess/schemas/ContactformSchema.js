"use strict";
/**
 * company schema for collections: companies
 */
var DataAccess = require("../DataAccess");
var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;
var ContactformSchema = (function () {
    function ContactformSchema() {
    }
    Object.defineProperty(ContactformSchema, "schema", {
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
                phone: {
                    type: String,
                    required: true
                },
                message: {
                    type: String,
                    required: true
                },
                createdOn: {
                    type: Date,
                    required: true
                }
            });
            return schema;
        },
        enumerable: true,
        configurable: true
    });
    return ContactformSchema;
}());
// we need to create a model using it
var ContactformModel = mongooseConnection.model("Contactform", ContactformSchema.schema);
module.exports = ContactformModel;
//# sourceMappingURL=ContactformSchema.js.map