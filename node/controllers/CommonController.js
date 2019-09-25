"use strict";
/**
 * Created by 76East for common and cron functions.
 */
var async = require('async');
var moment = require('moment');
var UserBusiness = require("./../app/business/UserBusiness");
var mongoose = require('mongoose');
var fs = require('fs');
var CommonController = (function () {
    function CommonController() {
    }
    CommonController.prototype.download = function (req, res) {
        try {
            var _userBusiness = new UserBusiness();
            _userBusiness.findOne({ _id: req.params.id }, function (error, result) {
                if (error) {
                    console.log(error);
                    res.send({ "error": error });
                }
                else {
                    var file = fs.createReadStream(process.cwd() + '/uploads/invoices/Invoice_' + req.params.id + '.pdf');
                    var stat = fs.statSync(process.cwd() + '/uploads/invoices/Invoice_' + req.params.id + '.pdf');
                    res.setHeader('Content-Length', stat.size);
                    res.setHeader('Content-Type', 'application/pdf');
                    res.setHeader('Content-Disposition', 'inline; filename=Invoice_' + result.invoiceNumber + '.pdf');
                    file.pipe(res);
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    CommonController.prototype.testEmail = function (req, res) {
        var _userBusiness = new UserBusiness();
    };
    return CommonController;
}());
module.exports = CommonController;
//# sourceMappingURL=CommonController.js.map