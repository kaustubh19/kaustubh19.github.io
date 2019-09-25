"use strict";
/**
 * Created by 76East.
 */
var Constants = (function () {
    function Constants() {
    }
    return Constants;
}());
Constants.DB_CONNECTION_STRING = process.env.NODE_ENV === 'production' ? process.env.dbURI : "mongodb://localhost:27017/employeemirror";
Object.seal(Constants);
module.exports = Constants;
//# sourceMappingURL=constants.js.map