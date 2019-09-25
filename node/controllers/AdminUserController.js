"use strict";
/**
 * api call lands here from routing
 */
var AdminUserBusiness = require("./../app/business/AdminUserBusiness");
var EmployeeBusiness = require("./../app/business/EmployeeBusiness");
var UserBusiness = require("./../app/business/UserBusiness");
var PostreviewBusiness = require("./../app/business/PostreviewBusiness");
var PlanBusiness = require("./../app/business/PlanBusiness");
var PagesBusiness = require("./../app/business/PagesBusiness");
var SavedCandidateBusiness = require("./../app/business/SavedCandidateBusiness");
var mongoose = require('mongoose');
var async = require('async');
var AdminUserController = (function () {
    function AdminUserController() {
    }
    AdminUserController.prototype.create = function (req, res) {
        console.log("in _user controller->create");
        try {
            var _user = req.body;
            var _adminUserBusiness = new AdminUserBusiness();
            _adminUserBusiness.create(_user, function (error, result) {
                if (error) {
                    console.log("ERROR ON BACKEND CONTROLLER");
                    console.log(error);
                    res.send({ "error": error });
                }
                else
                    res.send({ "success": "success" });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    ////////////////Admin//////////////////////////////////////////
    AdminUserController.prototype.allcandidate = function (req, res) {
        try {
            var _userBusiness = new UserBusiness();
            var _employeeBusiness = new EmployeeBusiness();
            var _savedCandidateBusiness = new SavedCandidateBusiness();
            var _candidates = req.body;
            async.parallel({
                downloadData: function (callback) {
                    var candidatesAggregate = [
                        {
                            $lookup: {
                                from: "saved_candidates",
                                localField: "_id",
                                foreignField: "user_id",
                                as: "saved_candidates"
                            }
                        },
                        {
                            $unwind: "$saved_candidates"
                        },
                        {
                            $lookup: {
                                from: "employees",
                                localField: "_id",
                                foreignField: "userId",
                                as: "employees"
                            }
                        },
                        {
                            $project: {
                                "_id": 1,
                                "firstName": 1,
                                "lastName": 1,
                                "companyName": 1,
                                "employees.profilePic": 1,
                                "saved_candidates.user_id": 1,
                                "saved_candidates.candidate_id": 1,
                                "saved_candidates.viewed": 1,
                                "saved_candidates.downloaded": 1,
                                "saved_candidates.amount": 1
                            }
                        }
                    ];
                    _userBusiness.aggregate(candidatesAggregate, function (error, result) {
                        if (error) {
                            res.send({ "error": error });
                        }
                        else {
                            var returnObj = result.map(function (obj) {
                                return {
                                    id: obj._id,
                                    firstName: obj.firstName,
                                    lastName: obj.lastName,
                                    profilePic: obj.employees.profilePic,
                                    companyName: obj.companyName,
                                    saved: obj.saved_candidates.saved,
                                    viewed: obj.saved_candidates.viewed,
                                    downloaded: obj.saved_candidates.downloaded,
                                    amount: obj.saved_candidates.amount
                                };
                            });
                            callback(null, returnObj);
                        }
                    });
                },
                userData: function (callback) {
                    var employeeAggregate = [
                        {
                            $lookup: {
                                from: "employees",
                                localField: "_id",
                                foreignField: "userId",
                                as: "employees"
                            }
                        },
                        {
                            $unwind: "$employees"
                        },
                        {
                            $project: {
                                "_id": 1,
                                "firstName": 1,
                                "lastName": 1,
                                "middleName": 1,
                                "email": 1,
                                "roles": 1,
                                "status": 1,
                                "paidOn": 1,
                                "amount": 1,
                                "companyName": 1,
                                "createdOn": 1,
                                "lastLogin": 1,
                                "previouscompanyName": 1,
                                "employees.strengths": 1,
                                "employees.improvements": 1,
                                "employees.summary": 1,
                                "employees.profilePic": 1,
                                "employees.profileCover": 1,
                                "employees.education": 1,
                                "employees.alternateEmail": 1,
                                "employees.dateofBirth": 1,
                                "employees.currentSalary": 1,
                                "employees.gender": 1,
                                "employees.expectedSalary": 1,
                                "employees.currentlyEmployed": 1,
                                "employees.openRelocation": 1,
                                "employees.openTravel": 1,
                                "employees.sponsorshipRequired": 1,
                                "employees.authorization": 1,
                                "employees.felony": 1,
                                "employees.phone": 1,
                                "employees.alternateMobile_number": 1,
                                "employees.currentaddress": 1,
                                "employees.permanentaddress": 1,
                                "employees.defoultsocial_media": 1,
                                "employees.skills": 1,
                                "employees.experienceYear": 1,
                                "employees.experienceMonth": 1,
                                "employees.social_media": 1,
                                "employees.professionalSummary": 1,
                                "employees.totaloverall": 1
                            }
                        },
                        {
                            $match: {
                                'roles': req.params._flag
                            }
                        }
                    ];
                    _userBusiness.aggregate(employeeAggregate, function (error, result) {
                        if (error) {
                            console.log('Error: manager case:', error);
                        }
                        else {
                            var returnObj = result.map(function (obj) {
                                var experienceYear = 0;
                                var experienceMonth = 0;
                                if (obj.employees.experienceYear) {
                                    experienceYear = obj.employees.experienceYear;
                                }
                                if (obj.employees.experienceMonth) {
                                    experienceMonth = obj.employees.experienceMonth;
                                }
                                return {
                                    id: obj._id,
                                    firstName: obj.firstName,
                                    lastName: obj.lastName,
                                    middleName: obj.middleName,
                                    email: obj.email,
                                    roles: obj.roles,
                                    paidOn: obj.paidOn,
                                    amount: obj.amount,
                                    status: obj.status,
                                    createdOn: obj.createdOn,
                                    lastLogin: obj.lastLogin,
                                    companyName: obj.companyName,
                                    previouscompanyName: obj.previouscompanyName,
                                    alternateEmail: obj.employees.alternateEmail,
                                    summary: obj.employees.summary,
                                    profilePic: obj.employees.profilePic,
                                    profileCover: obj.employees.profileCover,
                                    education: obj.employees.education,
                                    dateofBirth: obj.employees.dateofBirth,
                                    currentSalary: obj.employees.currentSalary,
                                    expectedSalary: obj.employees.expectedSalary,
                                    currentlyEmployed: obj.employees.currentlyEmployed,
                                    openRelocation: obj.employees.openRelocation,
                                    openTravel: obj.employees.openTravel,
                                    sponsorshipRequired: obj.employees.sponsorshipRequired,
                                    felony: obj.employees.felony,
                                    phone: obj.employees.phone,
                                    gender: obj.employees.gender,
                                    alternateMobile_number: obj.employees.alternateMobile_number,
                                    currentaddress: obj.employees.currentaddress,
                                    permanentaddress: obj.employees.permanentaddress,
                                    defoultsocial_media: obj.employees.defoultsocial_media,
                                    skills: obj.employees.skills,
                                    authorization: obj.employees.authorization,
                                    experienceMonth: experienceMonth,
                                    experienceYear: experienceYear,
                                    social_media: obj.employees.social_media,
                                    professionalSummary: obj.employees.professionalSummary,
                                    strengths: obj.employees.strengths,
                                    improvements: obj.employees.improvements,
                                    totaloverall: obj.employees.totaloverall
                                };
                            });
                            callback(null, returnObj);
                        }
                    });
                }
            }, function (err, results) {
                if (err) {
                    res.send({ "error": "error" });
                }
                console.log("results111====", results);
                res.json({ "status": "success", "data": results });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    AdminUserController.prototype.deleteusers = function (req, res) {
        var _id = req.params._id;
        try {
            var _userBusiness = new UserBusiness();
            _userBusiness.delete(_id, function (error, result) {
                if (error) {
                    res.send({ "error": "error" });
                }
                else {
                    console.log(result);
                    res.send({ "success": "success" });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    AdminUserController.prototype.userStatus = function (req, res) {
        var uid = req.params._id;
        // console.log("uid============>",uid)
        try {
            var _userBusiness = new UserBusiness();
            _userBusiness.findOne({ "_id": uid }, function (error, result) {
                if (error) {
                    res.send({ "error": "error" });
                }
                else {
                    var _user = req.body;
                    if (result.status == "verified") {
                        _user.status = "unverified";
                        _userBusiness.update(uid, _user, function (error, resultUpdate) {
                            if (error) {
                                res.send({ "error": "error" });
                            }
                            else {
                                res.send({ "success": "success" });
                            }
                        });
                    }
                    else {
                        _user.status = "verified";
                        _userBusiness.update(uid, _user, function (error, resultUpdate) {
                            if (error) {
                                res.send({ "error": "error" });
                            }
                            else {
                                res.send({ "success": "success" });
                            }
                        });
                    }
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    AdminUserController.prototype.PlanRegister = function (req, res) {
        try {
            var user = [];
            var plan = req.body.user;
            plan.createdOn = new Date();
            plan.plan = req.body.user.plan;
            plan.plan_name = "basic";
            var planBusiness = new PlanBusiness();
            planBusiness.retrieve({ 'plan_name': 'basic' }, function (error, result) {
                if (error) {
                    res.send({ "error": "error" });
                }
                else {
                    if (result.length > 0) {
                        console.log("plan====", plan);
                        planBusiness.update(result[0]._id, plan, function (error, result) {
                            if (error) {
                                res.send({ "error": "error" });
                            }
                            else {
                                res.send({ "success": "success" });
                            }
                        });
                    }
                    else {
                        console.log("user====", plan);
                        planBusiness.create(plan, function (error, userdata) {
                            if (error) {
                                console.log("error====", error);
                            }
                            else {
                                console.log("userdata==", userdata);
                                res.send({ "success": userdata });
                            }
                        });
                    }
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({
                "error": "error in your request"
            });
        }
    };
    AdminUserController.prototype.getPlans = function (req, res) {
        //console.log("daatat");
        try {
            var _planBusiness = new PlanBusiness();
            _planBusiness.retrieve({ 'plan_name': 'basic' }, function (error, result) {
                if (error) {
                    res.send({ "error": "error" });
                }
                else {
                    res.send(result);
                    //console.log("get all data plans",result);
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    AdminUserController.prototype.getDashboardData = function (req, res) {
        try {
            console.log("test=====");
            var _userBusiness = new UserBusiness();
            var _employeeBusiness = new EmployeeBusiness();
            var _candidates = req.body;
            var _savedCandidateBusiness = new SavedCandidateBusiness();
            var _postreviewBusiness = new PostreviewBusiness();
            async.parallel({
                userData: function (callback) {
                    _userBusiness.retrieve({}, function (error, result) {
                        if (error) {
                        }
                        else {
                            callback(null, result);
                        }
                    });
                },
                saveddocumentData: function (callback) {
                    _savedCandidateBusiness.retrieve({}, function (error, result) {
                        if (error) {
                        }
                        else {
                            callback(null, result);
                        }
                    });
                },
                employeedata: function (callback) {
                    var employeeAggregate = [
                        {
                            $lookup: {
                                from: "employees",
                                localField: "_id",
                                foreignField: "userId",
                                as: "employees"
                            }
                        },
                        {
                            $unwind: "$employees"
                        },
                        {
                            $lookup: {
                                from: "postreviews",
                                localField: "_id",
                                foreignField: "userId",
                                as: "postreviews"
                            }
                        },
                        {
                            $project: {
                                "_id": 1,
                                "firstName": 1,
                                "lastName": 1,
                                "middleName": 1,
                                "email": 1,
                                "roles": 1,
                                "status": 1,
                                "paidOn": 1,
                                "companyName": 1,
                                "createdOn": 1,
                                "previouscompanyName": 1,
                                "postreviews.overall": 1,
                                "employees.strengths": 1,
                                "employees.improvements": 1,
                                "employees.resume": 1,
                                "employees.summary": 1,
                                "employees.profilePic": 1,
                                "employees.profileCover": 1,
                                "employees.education": 1,
                                "employees.alternateEmail": 1,
                                "employees.dateofBirth": 1,
                                "employees.currentSalary": 1,
                                "employees.gender": 1,
                                "employees.expectedSalary": 1,
                                "employees.currentlyEmployed": 1,
                                "employees.openRelocation": 1,
                                "employees.openTravel": 1,
                                "employees.sponsorshipRequired": 1,
                                "employees.authorization": 1,
                                "employees.felony": 1,
                                "employees.phone": 1,
                                "employees.alternateMobile_number": 1,
                                "employees.currentaddress": 1,
                                "employees.permanentaddress": 1,
                                "employees.defoultsocial_media": 1,
                                "employees.skills": 1,
                                "employees.experienceYear": 1,
                                "employees.experienceMonth": 1,
                                "employees.social_media": 1,
                                "employees.professionalSummary": 1,
                            }
                        },
                        {
                            $match: {
                                $and: [{ roles: 'candidate' }, { status: 'verified' }]
                            }
                        }
                    ];
                    _userBusiness.aggregate(employeeAggregate, function (error, result) {
                        if (error) {
                            console.log('Error: manager case:', error);
                        }
                        else {
                            var returnObj = result.map(function (obj) {
                                console.log("obj.postreviews====", obj.postreviews);
                                return {
                                    id: obj._id,
                                    firstName: obj.firstName,
                                    lastName: obj.lastName,
                                    middleName: obj.middleName,
                                    email: obj.email,
                                    paidOn: obj.paidOn,
                                    roles: obj.roles,
                                    status: obj.status,
                                    createdOn: obj.createdOn,
                                    companyName: obj.companyName,
                                    previouscompanyName: obj.previouscompanyName,
                                    alternateEmail: obj.employees.alternateEmail,
                                    summary: obj.employees.summary,
                                    profilePic: obj.employees.profilePic,
                                    postreviews: obj.postreviews && obj.postreviews,
                                    profileCover: obj.employees.profileCover,
                                    education: obj.employees.education,
                                    dateofBirth: obj.employees.dateofBirth,
                                    currentSalary: obj.employees.currentSalary,
                                    expectedSalary: obj.employees.expectedSalary,
                                    currentlyEmployed: obj.employees.currentlyEmployed,
                                    openRelocation: obj.employees.openRelocation,
                                    openTravel: obj.employees.openTravel,
                                    sponsorshipRequired: obj.employees.sponsorshipRequired,
                                    felony: obj.employees.felony,
                                    phone: obj.employees.phone,
                                    gender: obj.employees.gender,
                                    resume: obj.employees.resume,
                                    alternateMobile_number: obj.employees.alternateMobile_number,
                                    currentaddress: obj.employees.currentaddress,
                                    permanentaddress: obj.employees.permanentaddress,
                                    defoultsocial_media: obj.employees.defoultsocial_media,
                                    skills: obj.employees.skills,
                                    authorization: obj.employees.authorization,
                                    experienceMonth: obj.employees.experienceMonth,
                                    experienceYear: obj.employees.experienceYear,
                                    social_media: obj.employees.social_media,
                                    professionalSummary: obj.employees.professionalSummary,
                                    strengths: obj.employees.strengths,
                                    improvements: obj.employees.improvements,
                                };
                            });
                            // console.log('Error: manager case:', returnObj);
                            callback(null, returnObj);
                        }
                    });
                },
            }, function (err, results) {
                if (err) {
                    res.send({ "error": "error" });
                }
                console.log("results=1====", results.employeedata);
                res.json({ "status": "success", "data": results });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    AdminUserController.prototype.update = function (req, res) {
        console.log("in _user controller->update");
        try {
            var _user = req.body;
            var getValue = req.body;
            var _adminUserBusiness = new AdminUserBusiness();
            _adminUserBusiness.verifyToken(req, res, function (adminUserData) {
                if (getValue.oldPassword && getValue.oldPassword != "") {
                    if (adminUserData.password == getValue.oldPassword) {
                        var _id = req.body;
                        _adminUserBusiness.update(_id, _user, function (error, result) {
                            if (error) {
                                res.send({ "error": "error" });
                            }
                            else {
                                res.send({ "success": "success" });
                            }
                        });
                    }
                    else {
                        res.status(400);
                        res.send({ "error": "oldPasswordNotSame" });
                    }
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    AdminUserController.prototype.retrieve = function (req, res) {
        try {
            var _adminUserBusiness = new AdminUserBusiness();
            _adminUserBusiness.verifyToken(req, res, function (adminUserData) {
                _adminUserBusiness.retrieve(req.body, function (error, result) {
                    if (error)
                        res.send({ "error": "error" });
                    else
                        res.send(result);
                });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    AdminUserController.prototype.findById = function (req, res) {
        try {
            var _adminUserBusiness = new AdminUserBusiness();
            _adminUserBusiness.verifyToken(req, res, function (adminUserData) {
                var _id = req.params._id;
                _adminUserBusiness.findById(_id, function (error, result) {
                    if (error)
                        res.send({ "error": "error" });
                    else
                        res.send(result);
                });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    AdminUserController.prototype.findByToken = function (req, res) {
        var _adminUserBusiness = new AdminUserBusiness();
        _adminUserBusiness.verifyToken(req, res, function (adminUserData) {
            res.send(adminUserData);
        });
    };
    AdminUserController.prototype.authenticate = function (req, res) {
        try {
            var _user = req.body;
            //set the createdon to now
            var _adminUserBusiness = new AdminUserBusiness();
            _adminUserBusiness.findOne({ email: _user.email }, function (error, result) {
                if (error)
                    res.send({ "error": "error" });
                else {
                    if (result && result.password && result.password == _user.password) {
                        if (!result.isActive) {
                            return res.status(401).send({ "error": "Your account is not active. Please contact admin." });
                        }
                        else {
                            var token = _adminUserBusiness.createToken(result);
                            var _updateData = req.body;
                            _updateData.lastLogin = new Date();
                            _updateData.token = token;
                            var _id = result._id.toString();
                            var _userBusinessUpdate = new AdminUserBusiness();
                            _userBusinessUpdate.update(_id, _updateData, function (error, resultUpdate) {
                                if (error)
                                    res.send({ "error": "error", "message": "Authentication error" }); //res.status(401).send({"error": "Authentication error"});
                                else {
                                    res.send({
                                        userId: result._id,
                                        email: result.email,
                                        firstName: result.firstName,
                                        lastName: result.lastName,
                                        permissions: 'S',
                                        token: token
                                    });
                                }
                            });
                        }
                    }
                    else {
                        return res.status(401).send({ "error": "The username or password don't match" });
                    }
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    AdminUserController.prototype.changePassword = function (req, res) {
        try {
            var _user = req.body;
            var getValue = req.body;
            var _adminUserBusiness = new AdminUserBusiness();
            _adminUserBusiness.verifyToken(req, res, function (adminData) {
                if (getValue.oldpassword && getValue.oldpassword != "") {
                    if (adminData.password == getValue.oldpassword) {
                        var _id = adminData._id;
                        _adminUserBusiness.update(_id, _user, function (error, result) {
                            if (error) {
                                res.send({ "error": "error" });
                            }
                            else {
                                res.send({ "success": "success" });
                            }
                        });
                    }
                    else {
                        res.status(400);
                        res.send({ "error": "oldPasswordNotSame" });
                    }
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    AdminUserController.prototype.getBillingDetail = function (req, res) {
    };
    AdminUserController.prototype.verifytoken = function (req, res) {
        var _adminUserBusiness = new AdminUserBusiness();
        _adminUserBusiness.verifyToken(req, res, function (adminUserData) {
            res.status(201).send({
                token: "valid"
            });
        });
    };
    //tbd split the incoming query to be {a:b} instead of a=b
    AdminUserController.prototype.count = function (req, res) {
        try {
            var query = req.params.query;
            var _adminUserBusiness = new AdminUserBusiness();
            _adminUserBusiness.count(query, function (error, result) {
                if (error) {
                    console.log(error);
                    res.send({ "error": "error" });
                }
                else {
                    res.send(result);
                }
                ;
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    AdminUserController.prototype.delete = function (req, res) {
        try {
            var _id = req.params._id;
            var _adminUserBusiness = new AdminUserBusiness();
            _adminUserBusiness.verifyToken(req, res, function (adminUserData) {
                _adminUserBusiness.delete(_id, function (error, result) {
                    if (error)
                        res.send({ "error": "error" });
                    else
                        res.send({ "success": "success" });
                });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    AdminUserController.prototype.updateContent = function (req, res) {
        try {
            var _pages = req.body;
            var _pagesBusiness = new PagesBusiness();
            _pagesBusiness.findOne({ "page": _pages.page }, function (error, result) {
                if (error) {
                    res.send({ "error": "error" });
                }
                else {
                    console.log(result);
                    if (result) {
                        _pagesBusiness.update(result._id, _pages, function (error, resultUpdate) {
                            if (error) {
                                res.send({ "error": "error" });
                            }
                            else {
                                _pagesBusiness.retrieve({}, function (error, result) {
                                    if (error) {
                                        res.send({ "error": "data" });
                                    }
                                    else {
                                        res.send(result);
                                    }
                                });
                            }
                        });
                    }
                    else {
                        _pagesBusiness.create(_pages, function (error, result) {
                            if (error) {
                                console.log("ERROR ON BACKEND CONTROLLER");
                                console.log(error);
                                res.send({ "error": error });
                            }
                            else
                                res.send({ "success": "inserted success" });
                        });
                    }
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    AdminUserController.prototype.getContent = function (req, res) {
        // console.log("req.body----",req.body);
        try {
            var _pagesBusiness = new PagesBusiness();
            _pagesBusiness.retrieve(req.body, function (error, result) {
                if (error) {
                    res.send({ "error": "data" });
                }
                else {
                    res.send(result);
                    console.log("get page data ==== ", result);
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    return AdminUserController;
}());
module.exports = AdminUserController;
//# sourceMappingURL=AdminUserController.js.map