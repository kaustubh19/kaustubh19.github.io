"use strict";
/**
 * company schema for collections: companies
 */
var DataAccess = require("../DataAccess");
var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;
var PagesSchema = (function () {
    function PagesSchema() {
    }
    Object.defineProperty(PagesSchema, "schema", {
        get: function () {
            var schema = mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                page: {
                    type: String,
                    required: true
                },
                content: {
                    type: String,
                    required: true
                }
            });
            return schema;
        },
        enumerable: true,
        configurable: true
    });
    return PagesSchema;
}());
// we need to create a model using it
var PagesModel = mongooseConnection.model("Pages", PagesSchema.schema);
module.exports = PagesModel;
//# sourceMappingURL=PagesSchema.js.map