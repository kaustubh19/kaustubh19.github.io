"use strict";
/**
 * api call lands here from routing
 */
var UserBusiness = require("./../app/business/UserBusiness");
var SavedCandidateBusiness = require("./../app/business/SavedCandidateBusiness");
var EmployeeBusiness = require("./../app/business/EmployeeBusiness");
var PagesBusiness = require("./../app/business/PagesBusiness");
var PostreviewBusiness = require("./../app/business/PostreviewBusiness");
var AdminUserBusiness = require("./../app/business/AdminUserBusiness");
var ContactformBusiness = require("./../app/business/ContactformBusiness");
var InvitationBusiness = require("./../app/business/InvitationBusiness");
var Common = require("./../config/constants/common");
var PlanBusiness = require("./../app/business/PlanBusiness");
var moment = require('moment');
var mammoth = require("mammoth");
var fs = require('fs');
var parseIt = require('../../utils/parseIt');
var _ = require('underscore');
var mongoose = require('mongoose');
var async = require('async');
var base64Img = require('base64-img');
var stripe = require("stripe")(Common.STRIPESECRETKEY);
var UserController = (function () {
    function UserController() {
    }
    UserController.prototype.create = function (req, res) {
        try {
            var _userBusiness = new UserBusiness();
            _userBusiness.verifyToken(req, res, function (companyUserData) {
                var _user = req.body;
                _user.createdOn = new Date();
                var _userBusiness = new UserBusiness();
                _userBusiness.create(_user, function (error, result) {
                    if (error) {
                        console.log(error);
                        res.send({ "error": error });
                    }
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
    UserController.prototype.UpdateHr = function (req, res) {
        try {
            var _userBusiness = new UserBusiness();
            _userBusiness.verifyToken(req, res, function (UserData) {
                var _user = req.body;
                //console.log("_user====",_user);
                //_user.createdOn = new Date();
                var _userBusiness = new UserBusiness();
                var _id = req.body.userId.toString();
                _userBusiness.update(mongoose.Types.ObjectId(_id), _user, function (error, userdata) {
                    if (error) {
                        console.log(error);
                        res.send({ "error": error });
                    }
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
    UserController.prototype.updateStatus = function (req, res) {
        try {
            var _user = req.body;
            var _postreviewBusiness = new PostreviewBusiness();
            var _id = _user.user.status;
            var _status = { 'status': 'verified' };
            _postreviewBusiness.update(mongoose.Types.ObjectId(_id), _status, function (error, userdata) {
                if (error) {
                    console.log(error);
                    res.send({ "error": error });
                }
                else {
                    _postreviewBusiness.retrieve(req.body, function (error, result) {
                        if (error) {
                            res.send({ "error": "error" });
                        }
                        else {
                            res.send(result);
                        }
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    UserController.prototype.viewdCandidates = function (req, res) {
        try {
            var _userBusiness = new UserBusiness();
            _userBusiness.verifyToken(req, res, function (companyUserData) {
                var _candidates = req.body;
                var _user = req.body;
                var _userBusiness = new UserBusiness();
                var _savedCandidateBusiness = new SavedCandidateBusiness();
                _candidates.user_id = companyUserData._id;
                _candidates.createdOn = new Date();
                if (req.body.flag == 'viewed') {
                    _candidates.viewed = 'true';
                    _candidates.candidate_id = req.body.savedcandidates;
                }
                _savedCandidateBusiness.findOne({ 'candidate_id': _candidates.candidate_id, 'user_id': companyUserData._id }, function (error, data) {
                    if (error) {
                        console.log(error);
                        res.send({ "error": error });
                    }
                    else {
                        if (data) {
                            _savedCandidateBusiness.update(data._id, _candidates, function (error, candidatedata) {
                                if (error) {
                                    console.log(error);
                                    //res.send({"error": error});
                                }
                                else {
                                    _userBusiness.update(mongoose.Types.ObjectId(req.body.user_id), _user, function (error, resultUpdate) {
                                        if (error) {
                                            console.log("error===", error);
                                        }
                                        else {
                                            //res.send({"success": "success"});
                                        }
                                    });
                                }
                            });
                        }
                        else {
                            _savedCandidateBusiness.create(_candidates, function (error, candidatedata) {
                                if (error) {
                                    console.log(error);
                                    res.send({ "error": error });
                                }
                                else {
                                    //res.send({"success": "success"});
                                }
                            });
                        }
                    }
                });
            });
        }
        finally { }
        ;
    };
    ;
    UserController.prototype.SavedCandidates = function (req, res) {
        try {
            //console.log("req.body.paid====",req.body.paid);
            var _userBusiness = new UserBusiness();
            _userBusiness.verifyToken(req, res, function (companyUserData) {
                var _candidates = req.body;
                var _user = req.body;
                var _userBusiness = new UserBusiness();
                var _savedCandidateBusiness = new SavedCandidateBusiness();
                _candidates.user_id = companyUserData._id;
                _candidates.createdOn = new Date();
                if (req.body.flag == 'saved') {
                    _candidates.saved = 'true';
                    _candidates.candidate_id = req.body.savedcandidates;
                }
                else {
                    var _id = req.body.id;
                    _candidates.saved = "";
                    _candidates.amount = req.body.total;
                    _candidates.paidOn = req.body.paid;
                    _candidates.downloaded = 'true';
                    _candidates.candidate_id = req.body.id;
                    _user.hrpaidOn = req.body.paid;
                }
                console.log("req.body====", _user.hrpaidOn);
                _savedCandidateBusiness.findOne({ 'candidate_id': _candidates.candidate_id, 'user_id': companyUserData._id }, function (error, data) {
                    if (error) {
                        //console.log(error);
                    }
                    else {
                        if (data) {
                            _savedCandidateBusiness.update(data._id, _candidates, function (error, candidatedata) {
                                if (error) {
                                    //console.log(error);
                                }
                                else {
                                    _userBusiness.update(mongoose.Types.ObjectId(req.body.user_id), _user, function (error, resultUpdate) {
                                        if (error) {
                                            //console.log("error===",error);
                                        }
                                        else {
                                            res.send({ "success": "success" });
                                        }
                                    });
                                }
                            });
                        }
                        else {
                            //console.log("ddddd=====");
                            _savedCandidateBusiness.create(_candidates, function (error, candidatedata) {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    if (req.body.flag == 'download') {
                                        _userBusiness.update(mongoose.Types.ObjectId(req.body.user_id), _user, function (error, resultUpdate) {
                                            if (error) {
                                                console.log("error===", error);
                                            }
                                            else {
                                                //res.send({"success": "success"});
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                });
                if (req.body.flag == 'download') {
                    if (_candidates.user_id) {
                        var _userBusiness = new UserBusiness();
                        var _employeeBusiness = new EmployeeBusiness();
                        var _id = _candidates.candidate_id;
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
                                    "companyName": 1,
                                    "createdOn": 1,
                                    "previouscompanyName": 1,
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
                                    "employees.totaloverall": 1,
                                    "employees.designation": 1,
                                }
                            },
                            {
                                $match: {
                                    '_id': mongoose.Types.ObjectId(_id)
                                }
                            }
                        ];
                        _userBusiness.aggregate(employeeAggregate, function (error, result) {
                            if (error) {
                                console.log('Error: manager case:', error);
                            }
                            else {
                                var returnObj = result.map(function (obj) {
                                    var expernice = 0;
                                    if (obj.employees.experienceYear) {
                                        expernice = obj.employees.experienceYear;
                                    }
                                    return {
                                        id: obj._id,
                                        firstName: obj.firstName,
                                        lastName: obj.lastName,
                                        middleName: obj.middleName,
                                        email: obj.email,
                                        roles: obj.roles,
                                        paidOn: obj.paidOn,
                                        status: obj.status,
                                        createdOn: obj.createdOn,
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
                                        resume: obj.employees.resume,
                                        alternateMobile_number: obj.employees.alternateMobile_number,
                                        currentaddress: obj.employees.currentaddress,
                                        permanentaddress: obj.employees.permanentaddress,
                                        defoultsocial_media: obj.employees.defoultsocial_media,
                                        skills: obj.employees.skills,
                                        authorization: obj.employees.authorization,
                                        experienceMonth: obj.employees.experienceMonth,
                                        experienceYear: expernice,
                                        social_media: obj.employees.social_media,
                                        professionalSummary: obj.employees.professionalSummary,
                                        strengths: obj.employees.strengths,
                                        improvements: obj.employees.improvements,
                                        totaloverall: obj.employees.totaloverall,
                                        designation: obj.employees.designation,
                                    };
                                });
                                var imageData = null;
                                if (returnObj && returnObj.length > 0) {
                                    try {
                                        if (returnObj[0].profilePic) {
                                            imageData = base64Img.base64Sync(process.cwd() + '/public/upload/' + returnObj[0].profilePic);
                                        }
                                    }
                                    catch (e) {
                                        console.log(e);
                                    }
                                }
                                _userBusiness.generateUserPdf(returnObj, imageData);
                                //res.send({"success": "success"});
                            }
                        });
                    }
                }
                if (req.body.flag == 'saved') {
                    res.send({ "success": "success" });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    UserController.prototype.update = function (req, res) {
        var employe = [];
        var userBusiness = new UserBusiness();
        userBusiness.verifyToken(req, res, function (companyUserData) {
            var user = req.body.user;
            if (req.body.employeeval.firstName) {
                user.firstName = req.body.employeeval.firstName.toLowerCase();
            }
            if (req.body.employeeval.lastName) {
                user.lastName = req.body.employeeval.lastName.toLowerCase();
            }
            if (req.body.employeeval.companyName) {
                user.companyName = req.body.employeeval.companyName.toLowerCase();
            }
            if (req.body.employeeval.previouscompanyName) {
                user.previouscompanyName = req.body.employeeval.previouscompanyName;
            }
            if (req.body.employeeval.middleName) {
                user.middleName = req.body.employeeval.middleName;
            }
            //console.log("data");
            var _id = req.body.employeeval.id.toString();
            userBusiness.update(mongoose.Types.ObjectId(_id), user, function (error, userdata) {
                if (error) {
                    console.log("error===", error);
                }
                else {
                    var _employee = req.body;
                    var _employeeBusiness = new EmployeeBusiness();
                    //set the default values
                    if (req.body.employeeval.dateofBirth) {
                        _employee.dateofBirth = req.body.employeeval.dateofBirth;
                    }
                    if (req.body.employeeval.designation) {
                        _employee.designation = req.body.employeeval.designation;
                    }
                    if (req.body.employeeval.totaloverall) {
                        var totalreview = req.body.employeeval.totaloverall;
                        var searchqu = 0;
                        if (totalreview > 1 && totalreview <= 1.5) {
                            searchqu = 1.5;
                        }
                        else if (totalreview > 2 && totalreview <= 2.5) {
                            searchqu = 2.5;
                        }
                        else if (totalreview > 3 && totalreview <= 3.5) {
                            searchqu = 3.5;
                        }
                        else if (totalreview > 4 && totalreview <= 4.5) {
                            searchqu = 4.5;
                        }
                        else {
                            searchqu = totalreview;
                        }
                        _employee.totaloverall = searchqu.toString();
                    }
                    if (req.body.employeeval.currentSalary) {
                        _employee.currentSalary = req.body.employeeval.currentSalary;
                    }
                    if (req.body.employeeval.gender) {
                        _employee.gender = req.body.employeeval.gender;
                    }
                    if (req.body.employeeval.summary) {
                        _employee.summary = req.body.employeeval.summary;
                    }
                    if (req.body.employeeval.currentlyEmployed) {
                        _employee.currentlyEmployed = req.body.employeeval.currentlyEmployed;
                    }
                    if (req.body.employeeval.openRelocation) {
                        _employee.openRelocation = req.body.employeeval.openRelocation;
                    }
                    if (req.body.employeeval.authorization) {
                        _employee.authorization = req.body.employeeval.authorization;
                    }
                    if (req.body.employeeval.felony) {
                        _employee.felony = req.body.employeeval.felony;
                    }
                    if (req.body.employeeval.phone) {
                        _employee.phone = req.body.employeeval.phone;
                    }
                    if (req.body.employeeval.alternateMobile_number) {
                        _employee.alternateMobile_number = req.body.employeeval.alternateMobile_number;
                    }
                    if (req.body.employeeval.alternateEmail) {
                        _employee.alternateEmail = req.body.employeeval.alternateEmail;
                    }
                    if (req.body.employeeval.experienceMonth) {
                        _employee.experienceMonth = req.body.employeeval.experienceMonth;
                    }
                    if (req.body.employeeval.education) {
                        _employee.education = req.body.employeeval.education;
                    }
                    if (req.body.employeeval.experienceYear) {
                        _employee.experienceYear = req.body.employeeval.experienceYear;
                    }
                    else {
                        _employee.experienceYear = 0;
                    }
                    if (req.body.employeeval.expectedSalary) {
                        _employee.expectedSalary = req.body.employeeval.expectedSalary;
                    }
                    if (req.body.employeeval.openTravel) {
                        _employee.openTravel = req.body.employeeval.openTravel;
                    }
                    if (req.body.employeeval.currentsalaryflag) {
                        _employee.currentsalaryflag = req.body.employeeval.currentsalaryflag;
                    }
                    if (req.body.employeeval.expectedsalaryflag) {
                        _employee.expectedsalaryflag = req.body.employeeval.expectedsalaryflag;
                    }
                    if (req.body.employeeval.expectedsalaryflag) {
                        _employee.expectedsalaryflag = req.body.employeeval.expectedsalaryflag;
                    }
                    if (req.body.employeeval.currentaddress) {
                        _employee.currentaddress = req.body.employeeval.currentaddress;
                    }
                    if (req.body.employeeval.defoultsocial_media) {
                        _employee.defoultsocial_media = req.body.employeeval.defoultsocial_media;
                    }
                    if (req.body.employeeval.social_media) {
                        _employeeBusiness.findOne({ 'userId': req.body.employeeval.id }, function (error, result) {
                            if (error) {
                                console.log("ueser");
                            }
                            else {
                                if (result.social_media && result.social_media.length != req.body.employeeval.social_media.length) {
                                    var usernewdata = result.social_media;
                                    var margedata = usernewdata.concat(req.body.employeeval.social_media);
                                    //_employee.social_media = margedata;
                                    var result_array = [];
                                    var len = margedata.length;
                                    var assoc = {};
                                    while (len--) {
                                        var item = margedata[len];
                                        if (!assoc[item]) {
                                            result_array.unshift(item);
                                            assoc[item] = true;
                                        }
                                    }
                                    _employee.social_media = result_array;
                                }
                            }
                        });
                    }
                    if (req.body.employeeval.permanentaddress) {
                        _employee.permanentaddress = req.body.employeeval.permanentaddress;
                    }
                    if (req.body.employeeval.strengths) {
                        _employee.strengths = req.body.employeeval.strengths;
                    }
                    if (req.body.employeeval.improvements) {
                        _employee.improvements = req.body.employeeval.improvements;
                    }
                    if (req.body.employeeval.skills) {
                        console.log("get sills", req.body.employeeval.skills);
                        _employee.skills = req.body.employeeval.skills;
                    }
                    if (req.body.employeeval.professionalSummary) {
                        _employee.professionalSummary = req.body.employeeval.professionalSummary;
                    }
                    _employee.createdDate = new Date();
                    _employeeBusiness.findOne({ 'userId': req.body.employeeval.id }, function (error, result) {
                        if (error) {
                            console.log("ueser");
                        }
                        else {
                            var _id = result._id.toString();
                            _employeeBusiness.update(mongoose.Types.ObjectId(_id), _employee, function (error, resultUpdate) {
                                if (error) {
                                    console.log("error===", error);
                                }
                                else {
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
                                                "hrpaidOn": 1,
                                                "companyName": 1,
                                                "createdOn": 1,
                                                "previouscompanyName": 1,
                                                "employees.strengths": 1,
                                                "employees.userId": 1,
                                                "employees._id": 1,
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
                                                "employees.totaloverall": 1,
                                                "employees.designation": 1
                                            }
                                        },
                                        {
                                            $match: {
                                                'employees._id': mongoose.Types.ObjectId(_id)
                                            }
                                        }
                                    ];
                                    userBusiness.aggregate(employeeAggregate, function (error, result) {
                                        if (error) {
                                            console.log('Error: manager case:', error);
                                        }
                                        else {
                                            var returnObj = result.map(function (obj) {
                                                return {
                                                    id: obj._id,
                                                    firstName: obj.firstName,
                                                    lastName: obj.lastName,
                                                    middleName: obj.middleName,
                                                    _id: obj.employees._id,
                                                    email: obj.email,
                                                    paidOn: obj.paidOn,
                                                    hrpaidOn: obj.hrpaidOn,
                                                    roles: obj.roles,
                                                    status: obj.status,
                                                    createdOn: obj.createdOn,
                                                    companyName: obj.companyName,
                                                    previouscompanyName: obj.previouscompanyName,
                                                    alternateEmail: obj.employees.alternateEmail,
                                                    summary: obj.employees.summary,
                                                    profilePic: obj.employees.profilePic,
                                                    profileCover: obj.employees.profileCover,
                                                    userId: obj.employees.userId,
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
                                                    designation: obj.employees.designation,
                                                    totaloverall: obj.employees.totaloverall,
                                                };
                                            });
                                            if (error) {
                                                console.log("ueser");
                                            }
                                            else {
                                                //console.log("returnObj====",returnObj);
                                                return res.json({ "user": Object.assign(returnObj[0]) });
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });
    };
    UserController.prototype.updateCandidateAmount = function (req, res) {
        try {
            var _userBusiness = new UserBusiness();
            var _user = req.body;
            var _userBusiness = new UserBusiness();
            var currdate = new moment();
            var nexttwomonth = currdate.add(2, 'month');
            console.log("nexttwomonth===", nexttwomonth);
            _user.amount = req.body.total;
            _user.paidOn = req.body.paid;
            _user.paidExpirydate = nexttwomonth;
            var _id = req.body.id;
            if (req.body.user) {
                _user.status = req.body.user.status;
                _id = req.body.user.id;
            }
            console.log("_user==", req.body);
            _userBusiness.update(_id, _user, function (error, candidatedata) {
                if (error) {
                    console.log(error);
                    res.send({ "error": error });
                }
                else {
                    return res.json("sucfully");
                }
            });
        }
        finally {
        }
    };
    UserController.prototype.updateprofilepic = function (data, id, res) {
        var _employeeBusiness = new EmployeeBusiness();
        var _emplloye = data;
        var type = data.mimetype.split("/");
        _emplloye.profilePic = data.filename;
        var userid = id.toString();
        _employeeBusiness.findOne({ 'userId': userid }, function (error, result) {
            if (error) {
                console.log("ueser");
            }
            else {
                var _id = result._id.toString();
                _employeeBusiness.update(_id, _emplloye, function (error, resultUpdate) {
                    if (error) {
                    }
                    else {
                        return res.json({ profileimg: _emplloye.profilePic });
                    }
                });
            }
        });
    };
    UserController.prototype.updatecoverupload = function (data, id, res) {
        var _employeeBusiness = new EmployeeBusiness();
        var _emplloye = data;
        var type = data.mimetype.split("/");
        _emplloye.profileCover = data.filename;
        var userid = id.toString();
        _employeeBusiness.findOne({ 'userId': userid }, function (error, result) {
            if (error) {
                console.log("ueser");
            }
            else {
                var _id = result._id.toString();
                _employeeBusiness.update(_id, _emplloye, function (error, resultUpdate) {
                    if (error) {
                    }
                    else {
                        return res.json({ profileimg: _emplloye.profilePic });
                    }
                });
            }
        });
    };
    UserController.prototype.sendinvite = function (req, res) {
        try {
            console.log("inviat", req.body);
            var max = 999999999;
            var min = 1111111111;
            var autoGeneratedToken = Math.floor(Math.random() * (max - min) + min);
            var autotoken = 'tok' + autoGeneratedToken;
            var _invitationBusiness = new InvitationBusiness();
            var _invitation = req.body;
            var _user = req.body;
            var _userBusiness = new UserBusiness();
            _invitationBusiness.findOne({ email: req.body.email, userId: req.body.userid }, function (error, result) {
                if (error) {
                    console.log("error not find");
                }
                else {
                    if (result == null) {
                        var loginfull = req.body.logInFullname;
                        var logInFullname = loginfull.charAt(0).toUpperCase() + loginfull.slice(1);
                        _invitation.fullName = req.body.fullname.charAt(0).toUpperCase() + req.body.fullname.slice(1);
                        _invitation.email = req.body.email;
                        _invitation.status = "unverified";
                        _invitation.userId = req.body.userid;
                        _invitation.websiteref = "True";
                        _invitation.token = autotoken;
                        _invitation.linkdinId = "false";
                        _invitation.createdOn = new Date();
                        var _userBusiness = new UserBusiness();
                        _invitationBusiness.create(_invitation, function (error, result) {
                            if (error) {
                                console.log(error);
                                res.send({
                                    "error": error
                                });
                            }
                            else {
                                _userBusiness.findOne({ 'email': _invitation.email }, function (error, results) {
                                    if (error) {
                                        console.log("ueser");
                                    }
                                    else {
                                        if (results == null) {
                                            var invatitionemail = Common.EMAIL_FOR_NEW_USER_INVITATION;
                                            var emailtemplate = invatitionemail.replace(/#email#/g, _invitation.email).replace(/#loginfullname#/g, logInFullname).replace(/#first_lastname#/g, _invitation.fullName).replace(/#autotoken#/g, _invitation.token);
                                            Common.sendMail(_invitation.email, Common.ADMIN_EMAIL, 'Welcome to EmployeMirrior!', null, emailtemplate, function (error, response) {
                                                if (error) {
                                                    console.log(error);
                                                    res.end("error");
                                                }
                                                else {
                                                    res.send(result);
                                                }
                                            });
                                        }
                                        else {
                                            var invatitionemail = Common.EMAIL_FOR_LOGIN_USER_INVITATION;
                                            var emailtemplate = invatitionemail.replace(/#email#/g, _invitation.email).replace(/#loginfullname#/g, logInFullname).replace(/#first_lastname#/g, _invitation.fullName).replace(/#autotoken#/g, _invitation.token);
                                            Common.sendMail(_invitation.email, Common.ADMIN_EMAIL, 'Welcome to EmployeMirrior!', null, emailtemplate, function (error, response) {
                                                if (error) {
                                                    console.log(error);
                                                    res.end("error");
                                                }
                                                else {
                                                    res.send(result);
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        });
                    }
                    else {
                        console.log('not send error');
                        res.send({ 'error': 'error' });
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
    UserController.prototype.getinvitationKey = function (req, res) {
        try {
            var _invitationBusiness = new InvitationBusiness();
            var _invitation = req.body;
            _invitationBusiness.findOne({
                'token': req.body.token
            }, function (error, result) {
                if (error) {
                    console.log("ueser");
                }
                else {
                    res.json(result);
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
    UserController.prototype.getinvitation = function (req, res) {
        try {
            var _employeeBusiness = new EmployeeBusiness();
            var _invitationBusiness = new InvitationBusiness();
            var _invitation = req.body;
            console.log("token", req.body.token);
            var employeeAggregate = [
                {
                    $lookup: {
                        from: "invitations",
                        localField: "userId",
                        foreignField: "userId",
                        as: "invitations"
                    }
                },
                {
                    $lookup: {
                        from: "postreviews",
                        localField: "userId",
                        foreignField: "userId",
                        as: "postreviews"
                    }
                },
                {
                    $lookup: {
                        from: "employees",
                        localField: "userId",
                        foreignField: "userId",
                        as: "employees"
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "users"
                    }
                },
                {
                    $project: {
                        "_id": 1,
                        "skills": 1,
                        "userId": 1,
                        "invitations.email": 1,
                        "invitations._id": 1,
                        "invitations.token": 1,
                        "postreviews.overall": 1,
                        "postreviews.userId": 1,
                        "postreviews.postuserId": 1,
                        "employees.totaloverall": 1,
                        "users": 1,
                    }
                },
                {
                    $match: {
                        $and: [
                            { 'invitations.token': req.body.token },
                        ]
                    }
                }
            ];
            _employeeBusiness.aggregate(employeeAggregate, function (error, result) {
                if (error) {
                    res.send({ "error": error });
                }
                else {
                    res.send({ "result": result });
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
    UserController.prototype.deleteprofilepic = function (req, res) {
        try {
            var _employeeBusiness = new EmployeeBusiness();
            var userid = req.body.userid;
            _employeeBusiness.findOne({ 'userId': userid }, function (error, result) {
                if (error) {
                    console.log("ueser");
                }
                else {
                    var _emplloye = req.body;
                    _emplloye.profilePic = "";
                    var _id = result._id.toString();
                    _employeeBusiness.update(_id, _emplloye, function (error, resultUpdate) {
                        if (error) {
                        }
                        else {
                            return res.json('updated succfully');
                        }
                    });
                }
                ;
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    UserController.prototype.deleteprofileCover = function (req, res) {
        try {
            var _employeeBusiness = new EmployeeBusiness();
            var userid = req.body.userid;
            _employeeBusiness.findOne({ 'userId': userid }, function (error, result) {
                if (error) {
                    console.log("ueser");
                }
                else {
                    var _emplloye = req.body;
                    _emplloye.profileCover = "";
                    var _id = result._id.toString();
                    _employeeBusiness.update(_id, _emplloye, function (error, resultUpdate) {
                        if (error) {
                        }
                        else {
                            return res.json('updated succfully');
                        }
                    });
                }
                ;
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    UserController.prototype.upload = function (data, id, res) {
        //var user: IUserModel = <IUserModel>req.body.user;
        var _employeeBusiness = new EmployeeBusiness();
        data.forEach(function (singleResult) {
            var _emplloye = singleResult;
            var type = singleResult.mimetype.split("/");
            if (type[0] == 'image') {
                _emplloye.profilePic = singleResult.filename;
                var userid = id.toString();
                _employeeBusiness.findOne({ 'userId': userid }, function (error, result) {
                    if (error) {
                        console.log("ueser");
                    }
                    else {
                        var _id = result._id.toString();
                        _employeeBusiness.update(_id, _emplloye, function (error, resultUpdate) {
                            if (error) {
                            }
                            else {
                                return res.json(_emplloye.profilePic);
                            }
                        });
                    }
                    ;
                });
            }
            else {
                _emplloye.resume = singleResult.filename;
                parseIt.parseResume("./public/upload/" + singleResult.filename, './compiled');
                var jsonData_1 = {};
                setTimeout(function () {
                    var fileurl = './compiled/' + singleResult.filename + '.json';
                    fs.readFile(fileurl, 'utf-8', function (err, data) {
                        if (err)
                            throw err;
                        jsonData_1 = JSON.parse(data);
                        var birthdate = '';
                        if (jsonData_1.birthdate) {
                            var str = jsonData_1.birthdate;
                            var resdata = str.split(":");
                            var dobregx = /^(0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)\d\d/g;
                            if (resdata.length > 0) {
                                if (resdata[0].match(dobregx)) {
                                    birthdate = resdata[0].replace(/th/g, '').replace(/nd/g, '').match(dobregx);
                                }
                                else {
                                    birthdate = resdata[1].replace(/th/g, '').replace(/nd/g, '');
                                }
                                if (birthdate) {
                                    console.log("else  ====");
                                    _emplloye.dateofBirth = birthdate;
                                }
                            }
                        }
                        if (jsonData_1.address) {
                            console.log("jsonData.address====", jsonData_1.address);
                            var addressregx = /([\s\S][^\\n])*\n/g;
                            console.log("jsonData.address=11===", jsonData_1.address.match(addressregx));
                            if (jsonData_1.address) {
                                _emplloye.currentaddress = [{ "street": jsonData_1.address.match(addressregx), "building": '', "city": '', 'postcode': 0, 'state': '', 'country': 'US' }];
                            }
                        }
                        if (jsonData_1.gender) {
                            var gendervalue = jsonData_1.gender;
                            var gendervalueregex = gendervalue.match(/(?<![\w\d])(Male|Female)(?![\w\d])/g);
                            if (gendervalueregex) {
                                gendervalueregex.forEach(function (value, index) {
                                    _emplloye.gender = value.trim();
                                });
                            }
                        }
                        var skilval = [];
                        if (jsonData_1.skills) {
                            var skills = jsonData_1.skills.split(",");
                            skills.forEach(function (skill) {
                                if (skill && skill.length < 15) {
                                    skilval.push({ keywordval: skill });
                                }
                            });
                            var skilArray = skilval.reduce(function (item, e1) {
                                var matches = item.filter(function (e2) {
                                    return typeof e2.keywordval !== 'undefined' && e1.keywordval.trim() == e2.keywordval.trim();
                                });
                                if (matches.length == 0) {
                                    item.push(e1);
                                }
                                return item;
                            }, []);
                            _emplloye.skills = skilArray;
                        }
                        _emplloye.alternateEmail = jsonData_1.email;
                        if (jsonData_1.summary) {
                            _emplloye.summary = jsonData_1.summary;
                        }
                        if (jsonData_1.mobile) {
                            _emplloye.phone = jsonData_1.mobile;
                        }
                        else {
                            _emplloye.phone = jsonData_1.phone;
                        }
                        var education = jsonData_1.education;
                        var yerasreg = /(\b(19|20)\d{2}\b)/g;
                        var percentregex = /\b(?<!\.)(?!0+(?:\.0+)?%)(?:\d|[1-9]\d|100)(?:(?<!100)\.\d+)?%/g;
                        var percentregex = /\b(?<!\.)(?!0+(?:\.0+)?%)(?:\d|[1-9]\d|100)(?:(?<!100)\.\d+)?%/g;
                        var schoolregex = /([A-Z][^\s,.]+[.]?\s[(]?)*(College|University|Institute|Law School|School of|Academy|School|Board)[^,\d]*(?=,|\d)/g;
                        var degreeregex = /([A-Z][^\s,.]+[.]?\s[(]?)*(MBA|MSc|BCS|M.B.A|Bachelor of Computers|B.A|B.tec|B.C.A|MCA|BCA|10th)[^,\d]*(?=,|\d)/g;
                        if (education) {
                            var degreename = '';
                            degreename = education.match(degreeregex);
                            var foundyears = '';
                            var foundpercentage = '';
                            var institutename = '';
                            foundyears = education.match(yerasreg);
                            foundpercentage = education.match(percentregex);
                            institutename = education.match(schoolregex);
                            var educationval = [];
                            if (foundyears) {
                                foundyears.forEach(function (foundyear, index) {
                                    if (foundpercentage) {
                                        foundpercentage = foundpercentage[index];
                                    }
                                    educationval.push({ "institute_name": institutename ? institutename[index] : '', "degree_name": '', "duration": foundyear ? foundyear[index] : '', "percentage": foundpercentage, "major": "" });
                                    _emplloye.education = educationval;
                                });
                            }
                            else {
                                if (institutename) {
                                    institutename.forEach(function (institutenameval, index) {
                                        if (foundpercentage) {
                                            foundpercentage = foundpercentage[index];
                                        }
                                        if (foundyears) {
                                            foundyears = foundyears[index];
                                        }
                                        educationval.push({ "institute_name": institutenameval, "degree_name": '', "duration": foundyears, "percentage": foundpercentage, "major": "" });
                                        _emplloye.education = educationval;
                                    });
                                }
                            }
                        }
                        var userid = id.toString();
                        _employeeBusiness.findOne({ 'userId': userid }, function (error, rmployeresult) {
                            if (error) {
                                console.log("ueser");
                            }
                            else {
                                var _id = rmployeresult._id.toString();
                                _employeeBusiness.update(mongoose.Types.ObjectId(_id), _emplloye, function (error, resultUpdate) {
                                    if (error) {
                                        console.log("error====", error);
                                    }
                                    else {
                                        return res.json('updated succfully');
                                    }
                                });
                            }
                            ;
                        });
                    });
                }, 5000);
            }
        });
    };
    UserController.prototype.getKeyword = function (req, res) {
        var strval = req.params.query;
        var str = strval.replace(/^"(.*)"$/, '$1').toLowerCase().trim();
        str = str.split(" ");
        str = str[0];
        var _userBusiness = new UserBusiness();
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
                $lookup: {
                    from: "saved_candidates",
                    localField: "_id",
                    foreignField: "candidate_id",
                    as: "saved_candidates"
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
                    "previouscompanyName": 1,
                    "employees.profilePic": 1,
                    "employees.dateofBirth": 1,
                    "employees.currentSalary": 1,
                    "employees.expectedSalary": 1,
                    "employees.phone": 1,
                    "employees.currentaddress": 1,
                    "employees.permanentaddress": 1,
                    "employees.defoultsocial_media": 1,
                    "employees.experienceYear": 1,
                    "employees.experienceMonth": 1,
                    "employees.professionalSummary": 1,
                    "employees.totaloverall": 1,
                    "employees.social_media": 1,
                    "employees.currentsalaryflag": 1,
                    "employees.expectedsalaryflag": 1,
                    "employees.designation": 1,
                    "saved_candidates.saved": 1,
                    "saved_candidates.downloaded": 1,
                    "saved_candidates.candidate_id": 1,
                    "saved_candidates.user_id": 1,
                    "saved_candidates.createdOn": 1,
                    "postreviews": 1,
                }
            },
            {
                $match: {
                    $or: [{ firstName: { $regex: str }, firstName: { $regex: str } }, { lastName: { $regex: str }, lastName: { $regex: str } }, { "employees.professionalSummary.company_name": { $regex: str } }],
                    $and: [{ roles: 'candidate' }, { status: 'verified' }]
                }
            }
        ];
        _userBusiness.aggregate(employeeAggregate, function (error, result) {
            if (error) {
                res.send({ "error": error });
            }
            else {
                if (result.length > 0) {
                    var totalstar = 0;
                    result.forEach(function (item, i) {
                        if (item.postreviews.length > 0) {
                            var b = 0;
                            for (var a = 0; a < item.postreviews.length; a++) {
                                if (item.postreviews[a].status == "verified") {
                                    totalstar = parseFloat(item.postreviews[a].overall) + totalstar;
                                    b++;
                                }
                                var multi = b * 5;
                                var data = (totalstar * 5) / multi;
                                console.log("texttotal", data);
                                result[i]['overall'] = data;
                            }
                        }
                    });
                }
                res.send({ "result": result });
            }
        });
    };
    UserController.prototype.delete = function (req, res) {
        try {
            var _userBusiness = new UserBusiness();
            var _employeeBusiness = new EmployeeBusiness();
            _userBusiness.verifyToken(req, res, function (userdata) {
                _employeeBusiness.findOne({ 'userId': userdata.id }, function (error, result) {
                    if (error) {
                        console.log("error");
                    }
                    else {
                        var _employee = req.body;
                        if (req.params._flag == 'education') {
                            var education = result.education.filter(function (item) {
                                return item._id != req.params._id;
                            });
                            _employee.education = education;
                            var _id = result._id.toString();
                            _employeeBusiness.update(mongoose.Types.ObjectId(_id), _employee, function (error, resultUpdate) {
                                if (error) {
                                    console.log("error===", error);
                                }
                                else {
                                    return res.json('updated succfully');
                                }
                            });
                        }
                        if (req.params._flag == 'skills') {
                            var skill = result.skills.filter(function (item) {
                                return item._id != req.params._id;
                            });
                            _employee.skills = skill;
                            var _id = result._id.toString();
                            _employeeBusiness.update(mongoose.Types.ObjectId(_id), _employee, function (error, resultUpdate) {
                                if (error) {
                                    console.log("error===", error);
                                }
                                else {
                                    return res.json('updated succfully');
                                }
                            });
                        }
                        if (req.params._flag == 'professional') {
                            var professionalSummary = result.professionalSummary.filter(function (item) {
                                return item._id != req.params._id;
                            });
                            _employee.professionalSummary = professionalSummary;
                            var _id = result._id.toString();
                            _employeeBusiness.update(mongoose.Types.ObjectId(_id), _employee, function (error, resultUpdate) {
                                if (error) {
                                    console.log("error===", error);
                                }
                                else {
                                    return res.json('updated succfully');
                                }
                            });
                        }
                        if (req.params._flag == 'socialmedia') {
                            var socialmedia = result.social_media.filter(function (item) {
                                return item._id != req.params._id;
                            });
                            _employee.social_media = socialmedia;
                            var _id = result._id.toString();
                            _employeeBusiness.update(mongoose.Types.ObjectId(_id), _employee, function (error, resultUpdate) {
                                if (error) {
                                    console.log("error===", error);
                                }
                                else {
                                    console.log('updated succfully');
                                    return res.json('updated succfully');
                                }
                            });
                        }
                    }
                });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    UserController.prototype.retrieve = function (req, res) {
        try {
            var _userBusiness = new UserBusiness();
            _userBusiness.verifyToken(req, res, function (companyUserData) {
                _userBusiness.retrieve(req.body, function (error, result) {
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
    UserController.prototype.Pagesretrieve = function (req, res) {
        try {
            var _pagesBusiness = new PagesBusiness();
            _pagesBusiness.retrieve(req.body, function (error, result) {
                if (error) {
                    res.send({ "error": "error" });
                    console.log(result);
                }
                else {
                    res.send(result);
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    UserController.prototype.findById = function (req, res) {
        try {
            var sum_1 = {};
            var _userBusiness = new UserBusiness();
            var _employeeBusiness = new EmployeeBusiness();
            _userBusiness.verifyToken(req, res, function (userdata) {
                var _savedCandidateBusiness = new SavedCandidateBusiness();
                async.parallel({
                    planData: function (callback) {
                        var planBusiness = new PlanBusiness();
                        planBusiness.retrieve({ 'plan_name': 'basic' }, function (error, result) {
                            if (error) {
                            }
                            else {
                                callback(null, result);
                            }
                        });
                    },
                    downloadData: function (callback) {
                        _savedCandidateBusiness.retrieve({ 'user_id': userdata.id }, function (error, downloadData) {
                            if (error) {
                            }
                            else {
                                callback(null, downloadData);
                            }
                        });
                    },
                    userData: function (callback) {
                        var _id = req.params._id;
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
                                    "hrpaidOn": 1,
                                    "companyName": 1,
                                    "createdOn": 1,
                                    "previouscompanyName": 1,
                                    "employees.strengths": 1,
                                    "employees.improvements": 1,
                                    "employees.resume": 1,
                                    "employees.summary": 1,
                                    "employees.profilePic": 1,
                                    "employees.profileCover": 1,
                                    "employees.currentsalaryflag": 1,
                                    "employees.expectedsalaryflag": 1,
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
                                    "employees.totaloverall": 1,
                                    "employees.designation": 1,
                                    "postreviews.technicalexp": 1
                                }
                            },
                            {
                                $match: {
                                    '_id': mongoose.Types.ObjectId(_id)
                                }
                            }
                        ];
                        _userBusiness.aggregate(employeeAggregate, function (error, result) {
                            if (error) {
                                console.log('Error: manager case:', error);
                            }
                            else {
                                var returnObj = result.map(function (obj) {
                                    return {
                                        id: obj._id,
                                        firstName: obj.firstName,
                                        lastName: obj.lastName,
                                        middleName: obj.middleName,
                                        email: obj.email,
                                        paidOn: obj.paidOn,
                                        hrpaidOn: obj.hrpaidOn,
                                        roles: obj.roles,
                                        status: obj.status,
                                        createdOn: obj.createdOn,
                                        companyName: obj.companyName,
                                        previouscompanyName: obj.previouscompanyName,
                                        alternateEmail: obj.employees.alternateEmail,
                                        summary: obj.employees.summary,
                                        profilePic: obj.employees.profilePic,
                                        profileCover: obj.employees.profileCover,
                                        education: obj.employees.education,
                                        dateofBirth: obj.employees.dateofBirth,
                                        currentsalaryflag: obj.employees.currentsalaryflag,
                                        expectedsalaryflag: obj.employees.expectedsalaryflag,
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
                                        totaloverall: obj.employees.totaloverall,
                                        designation: obj.employees.designation,
                                        postreviews: obj.postreviews
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
                    var getdata = [];
                    if (results.userData[0].skills && results.userData[0].skills.length > 0) {
                        if (results.userData[0].skills && results.userData[0].skills.length > 0) {
                            var skills = results.userData[0].skills;
                            //console.log("skills===",skills);
                            skills.forEach(function (item, i) {
                                if (results.userData[0].postreviews.length > 0) {
                                    var tecexp = results.userData[0].postreviews;
                                    tecexp.forEach(function (itemexp, k) {
                                        if (itemexp && itemexp.technicalexp) {
                                            var checkkey = (item.keywordval in itemexp.technicalexp);
                                            if (checkkey === true) {
                                                var skillkey = item.keywordval;
                                                var skillreview = itemexp.technicalexp[skillkey];
                                                getdata.push((_a = {}, _a[skillkey] = skillreview, _a));
                                            }
                                        }
                                        var _a;
                                    });
                                }
                            });
                            getdata.forEach(function (item) {
                                console.log("item====", item);
                                for (var key in item)
                                    sum_1[key] = sum_1[key] ? sum_1[key] + item[key] : item[key];
                            });
                        }
                    }
                    //console.log("results=====",getdata);
                    res.json({ "status": "success", "data": results, "review": sum_1 });
                });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    UserController.prototype.findByToken = function (req, res) {
        var _userBusiness = new UserBusiness();
        _userBusiness.verifyToken(req, res, function (UserData) {
            res.send(UserData);
        });
    };
    //being called by client getEmailExists
    UserController.prototype.getEmailExists = function (req, res) {
        try {
            var query = req.params.query;
            var _userBusiness = new UserBusiness();
            _userBusiness.count({ 'email': { $regex: "^" + (query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')) + "$", $options: "i" } }, function (error, result) {
                if (error) {
                    console.log(error);
                    res.send({ "error": "error" });
                }
                else {
                    res.send(JSON.stringify(result));
                }
                ;
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    UserController.prototype.register = function (req, res) {
        try {
            var user = req.body.user;
            user.createdOn = new Date();
            //	var autoGeneratedPassword = Math.random().toString(36).slice(-8);
            var autoGeneratedPassword = ""; // Empty value of the selective variable
            var allCharacters = "'~!@#$%^&*()_+\'0123456789/|\\adgkvwxyzABCDTUVJ'"; // listing of all alpha-numeric letters
            var stringLength = 6;
            while (stringLength--) {
                autoGeneratedPassword += allCharacters.substr(Math.floor((Math.random() * allCharacters.length) + 1), 1); // selecting any value from allCharacters varible by using Math.random()
            }
            user.password = autoGeneratedPassword;
            user.firstName = req.body.user.firstName.toLowerCase();
            user.lastName = req.body.user.lastName.toLowerCase();
            user.paidOn = false;
            var userBusiness = new UserBusiness();
            var token = userBusiness.createToken(user);
            userBusiness.create(user, function (error, userdata) {
                if (error) {
                    console.log("error====", error);
                    res.send({
                        "error": error
                    });
                }
                else {
                    var _employee = req.body;
                    var _employeeBusiness = new EmployeeBusiness();
                    //set the default values
                    _employee.userId = mongoose.Types.ObjectId(userdata._id);
                    _employee.createdDate = new Date();
                    if (req.body.data) {
                        _employee.summary = req.body.data.bio;
                        _employee.profilePic = req.body.data.avatar;
                        _employee.professionalSummary = req.body.data.positions;
                    }
                    _employeeBusiness.create(_employee, function (error, result) {
                        if (error) {
                            console.log(error);
                            res.send({
                                "error": error
                            });
                        }
                        else {
                            var signupemailtemplatetouser = Common.SIGNUP_EMAIL_TEMPLATE_TO_REGISTERED_USER;
                            var emailtemplate = signupemailtemplatetouser.replace(/#email#/g, userdata.email).replace(/#password#/g, userdata.password);
                            Common.sendMail(userdata.email, Common.ADMIN_EMAIL, 'Welcome to EmployeMirrior!', null, emailtemplate, function (error, response) {
                                if (error) {
                                    console.log(error);
                                    res.send("error");
                                }
                                else {
                                    res.send({ "success": "success" });
                                }
                            });
                            if (!user.linkdinId) {
                                var _invitationBusiness = new InvitationBusiness();
                                var _invitation = req.body;
                                console.log("to proccess email===", userdata.email);
                                _invitationBusiness.findOne({
                                    'email': userdata.email
                                }, function (error, result) {
                                    if (error) {
                                        console.log("error==1");
                                    }
                                    else {
                                        if (result) {
                                            var _id = result._id.toString();
                                            _invitation.status = 'verified';
                                            _invitationBusiness.update({ _id: mongojs.ObjectId(_id) }, { $set: { status: 'verified' } }, {}, function (err, resultUpdate) {
                                                //_invitationBusiness.update(mongoose.Types.ObjectId(_id),_invitation, (error: any, resultUpdate: any) => {
                                                if (error) {
                                                    console.log("error===2");
                                                }
                                                console.log("update result", _invitation.token);
                                            });
                                        }
                                    }
                                });
                                res.send({
                                    userId: result._id,
                                    email: user.email,
                                    firstName: userdata.firstName,
                                    lastName: userdata.lastName,
                                    createdOn: result.createdOn,
                                    token: token
                                });
                            }
                        }
                    });
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
    /*register(req: express.Request, res: express.Response): void {
       try {
           var user: IUserModel = < IUserModel > req.body.user;
           user.createdOn = new Date();
           var autoGeneratedPassword = Math.random().toString(36).slice(-8);
           user.password = 'P' + autoGeneratedPassword;
           user.firstName=req.body.user.firstName.toLowerCase();
           user.lastName=req.body.user.lastName.toLowerCase();
           user.paidOn= false;
           var userBusiness = new UserBusiness();
           var token = userBusiness.createToken(user);

           userBusiness.create(user, (error, userdata) => {
               if (error) {
                   console.log("error====", error);
                   res.send({
                       "error": error
                   });
               } else {
                   var _employee: IEmployeeModel = < IEmployeeModel > req.body;
                   var _employeeBusiness = new EmployeeBusiness();
                   //set the default values
                   _employee.userId = mongoose.Types.ObjectId(userdata._id);
                   _employee.createdDate = new Date();
                   if (req.body.data) {
                       _employee.summary = req.body.data.bio;
                       _employee.profilePic = req.body.data.avatar;
                       _employee.professionalSummary = req.body.data.positions;
                   }
                   _employeeBusiness.create(_employee, (error, result) => {
                       if (error) {
                           console.log(error);
                           res.send({
                               "error": error
                           });
                       } else {
                           if (!user.linkdinId) {
                               var signupemailtemplatetouser = Common.SIGNUP_EMAIL_TEMPLATE_TO_REGISTERED_USER;
                               var emailtemplate = signupemailtemplatetouser.replace(/#email#/g, userdata.email).replace(/#password#/g, userdata.password);
                                Common.sendMail(userdata.email, Common.ADMIN_EMAIL, 'Welcome to EmployeMirrior!', null, emailtemplate, function(error: any, response: any) {
                                   if (error) {
                                       console.log(error);
                                       res.end("error");
                                   }
                               });
                               var _invitationBusiness = new InvitationBusiness();
                               var _invitation: IInvitationModel = < IInvitationModel > req.body;
                               _invitationBusiness.findOne({
                                   'email': userdata.email
                               }, (error, result) => {
                                   if (error) {
                                       console.log("error==1");
                                   } else {
                                      if(result){
                                           var _id: string = result._id.toString();
                                           _invitation.status = 'verified';
                                           _invitationBusiness.update(mongoose.Types.ObjectId(_id),_invitation, (error: any, resultUpdate: any) => {
                                               if (error) {
                                                   console.log("error===2");
                                               }
                                           });
                                       }
                                   }
                               });
                               res.send({
                                   userId: result._id,
                                   email: user.email,
                                   firstName: userdata.firstName,
                                   lastName: userdata.lastName,
                                   createdOn: result.createdOn,
                                   token: token

                               });
                           }
                       }
                   });
               }
           });
       } catch (e) {
           console.log(e);
           res.send({
               "error": "error in your request"
           });

       }

   }*/
    UserController.prototype.authenticate = function (req, res) {
        try {
            var _user = req.body;
            var _userBusiness = new UserBusiness();
            var _employeeBusiness = new EmployeeBusiness();
            var _employeeBusinessDataValue = [
                {
                    $lookup: // For fetch data from another model as well ... join
                    {
                        from: "employees",
                        localField: "_id",
                        foreignField: "userId",
                        as: "employees" // used as alias.
                    }
                },
                {
                    $unwind: "$employees"
                },
                {
                    $project: // For sepecific field that we want to fetch
                    {
                        "email": 1,
                        "firstName": 1,
                        "lastName": 1,
                        "createdOn": 1,
                        "status": 1,
                        "roles": 1,
                        "password": 1,
                        "linkdinId": 1,
                        "employees.resume": 1,
                        "employees.profilePic": 1,
                        "companyName": 1,
                        "token": 1,
                        "paidOn": 1,
                        "hrpaidOn": 1,
                    }
                },
                {
                    $match: {
                        email: { $regex: "^" + (_user.email.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')) + "$", $options: "i" }
                    }
                }
            ];
            _userBusiness.aggregate(_employeeBusinessDataValue, function (error, result) {
                if (error) {
                    console.log(error);
                    res.send({ "error": error });
                }
                else {
                    if (result.length > 0) {
                        var returnObj = result.map(function (obj) {
                            //console.log("obj.linkdinId===",obj);
                            if (_user.password == obj.linkdinId && _user.email == obj.email) {
                                if (_user) {
                                    var _userBusinessUpdate = new UserBusiness();
                                    var _id = obj._id.toString();
                                    var token = _userBusiness.createToken(obj);
                                    _user.token = token;
                                    _user.lastLogin = new Date();
                                    _userBusinessUpdate.update(_id, _user, function (error, resultUpdate) {
                                        if (error) {
                                            res.send({ "error": "error", "message": error }); //res.status(401).send({"error": "Authentication error"});
                                        }
                                        else {
                                            console.log("fgfgfgf");
                                            if (obj.employees.resume) {
                                                var isresume = "true";
                                            }
                                            else {
                                                var isresume = "false";
                                            }
                                            res.send({
                                                userId: obj._id,
                                                email: obj.email,
                                                firstName: obj.firstName,
                                                lastName: obj.lastName,
                                                createdOn: obj.createdOn,
                                                roles: obj.roles,
                                                token: token,
                                                paidOn: obj.paidOn,
                                                hrpaidOn: obj.hrpaidOn,
                                                companyName: obj.companyName,
                                                resume: isresume,
                                                profilePic: obj.employees.profilePic
                                            });
                                        }
                                    });
                                }
                                else {
                                    return res.status(401).send({ "error": "The username or password don't match" });
                                }
                            }
                            else if (obj && obj.password && obj.password == _user.password) {
                                if (obj.status != 'unverified') {
                                    var _employeeBusiness = new EmployeeBusiness();
                                    _employeeBusiness.findById(obj._id, function (error, resultEmployee) {
                                        if (error)
                                            res.send({ "error": "error", "message": "Authentication error" });
                                        else {
                                            var token = _userBusiness.createToken(result);
                                            var _updateData = req.body;
                                            _updateData.lastLogin = new Date();
                                            _updateData.token = token;
                                            _updateData.email = obj.email;
                                            var _id = obj._id.toString();
                                            var _userBusinessUpdate = new UserBusiness();
                                            _userBusinessUpdate.update(_id, _updateData, function (error, resultUpdate) {
                                                if (error)
                                                    res.send({ "error": "error", "message": error }); //res.status(401).send({"error": "Authentication error"});
                                                else {
                                                    if (obj.employees.resume) {
                                                        var isresume = "true";
                                                    }
                                                    else {
                                                        var isresume = "false";
                                                    }
                                                    res.send({
                                                        userId: obj._id,
                                                        email: obj.email,
                                                        firstName: obj.firstName,
                                                        lastName: obj.lastName,
                                                        createdOn: obj.createdOn,
                                                        roles: obj.roles,
                                                        token: token,
                                                        paidOn: obj.paidOn,
                                                        hrpaidOn: obj.hrpaidOn,
                                                        companyName: obj.companyName,
                                                        resume: isresume,
                                                        profilePic: obj.employees.profilePic
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                                else {
                                    return res.status(401).send({ "error": "This account is not active now, please contact Website Admin to activate the account." });
                                }
                            }
                            else {
                                console.log("=====9999");
                                return res.status(401).send({ "error": "The username or password don't match" });
                            }
                        });
                    }
                    else {
                        return res.status(401).send({ "error": "No registration is there with this Email Id." });
                    }
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    UserController.prototype.contactForm = function (req, res) {
        try {
            var _contactform = req.body;
            var _contactformBusiness = new ContactformBusiness();
            _contactform.fullname = req.body.fullname;
            _contactform.email = req.body.email;
            _contactform.phone = req.body.phone;
            _contactform.message = req.body.message;
            _contactform.createdOn = new Date();
            _contactformBusiness.create(_contactform, function (error, result) {
                if (error) {
                    console.log(error);
                    res.send({ "error=========": error });
                }
                else {
                    var contactFormemail = Common.CONTACT_FORM;
                    var emailtemplate = contactFormemail.replace(/#fullname#/g, _contactform.fullname).replace(/#email#/g, _contactform.email).replace(/#phone#/g, _contactform.phone).replace(/#message#/g, _contactform.message).replace(/#date#/g, _contactform.createdOn);
                    Common.sendMail(_contactform.email, 'support@employeemirror.com', 'Contact Form', null, emailtemplate, function (error, response) {
                        if (error) {
                            console.log(error);
                            res.end("error");
                        }
                    });
                    res.status(201).send({ "success": "done" });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    UserController.prototype.forgetUserPassword = function (req, res) {
        try {
            var _user = req.body;
            var _userBusiness = new UserBusiness();
            _userBusiness.findOne({ email: _user.email }, function (error, result) {
                if (error) {
                    res.send({ "error": "error" });
                }
                else {
                    if (result && result.email == _user.email) {
                        if (result.status == 'unverified') {
                            return res.status(401).send({ "error": "Your account is not verified. Please contact admin." });
                        }
                        else {
                            var token = _userBusiness.createToken(result);
                            var _updateData = req.body;
                            _updateData.lastLogin = new Date();
                            _updateData.token = token;
                            var _id = result._id.toString();
                            var _userBusinessUpdate = new UserBusiness();
                            // Generate new password ...
                            var autoGeneratedPassword = Math.random().toString(36).slice(-8);
                            _user.password = 'P' + autoGeneratedPassword;
                            _userBusinessUpdate.update(_id, _updateData, function (error, resultUpdate) {
                                if (error)
                                    res.send({ "error": "error", "message": "Authentication error" }); //res.status(401).send({"error": "Authentication error"});
                                else {
                                    var _userBusiness = new UserBusiness();
                                    _userBusiness.findById(_id, function (error, resultuser) {
                                        if (error)
                                            res.send({ "error": "error", "message": "Authentication error" });
                                        else {
                                            var emailresetpassword = Common.EMAIL_TEMPLATE_RESET_USER_PASSWORD;
                                            var emailtemplate = emailresetpassword.replace(/#password#/g, _user.password);
                                            Common.sendMail(result.email, 'support@employeemirror.com', 'Forgot Password', null, emailtemplate, function (error, response) {
                                                if (error) {
                                                    console.log(error);
                                                    res.end("error");
                                                }
                                            });
                                            res.status(201).send({ "success": "done" });
                                        }
                                    });
                                }
                            });
                        }
                    }
                    else {
                        return res.status(401).send({ "error": "You have entered invalid email." });
                    }
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    UserController.prototype.UpdateUserPassword = function (req, res) {
        try {
            var _user = req.body;
            var _userBusiness = new UserBusiness();
            var _idc = req.body.user;
            _user.password = req.body.newpassword;
            _userBusiness.findOne({ _id: _idc, password: req.body.currentpassword }, function (error, result) {
                if (error) {
                    res.send({ "error": "Please enter current vaild password." });
                }
                else if (result == null) {
                    res.send({ "error": "Please enter current vaild password." });
                }
                else {
                    _user.password = req.body.newpassword;
                    _userBusiness.update(_idc, _user, function (error, resultUpdate) {
                        if (error)
                            res.send({ "error": "error", "message": "Your password is not updated." });
                        else {
                            res.status(201).send({ "success": "Your password is successfully updated." });
                        }
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    UserController.prototype.forgetSAdminPassword = function (req, res) {
        try {
            var _user = req.body;
            var _adminUserBusiness = new AdminUserBusiness();
            var _userBusiness = new UserBusiness();
            _adminUserBusiness.findOne({ email: _user.email }, function (error, result) {
                if (error)
                    res.send({ "error": "error" });
                else {
                    if (result && result.email == _user.email) {
                        if (!result.isActive) {
                            return res.status(401).send({ "error": "Your account is not active. Please contact admin." });
                        }
                        else {
                            var token = _userBusiness.createToken(result);
                            var _updateAdminData = req.body;
                            _updateAdminData.lastLogin = new Date();
                            _updateAdminData.token = token;
                            var _id = result._id.toString();
                            var _adminUserBusiness = new AdminUserBusiness();
                            // Generate new password ...
                            var autoGeneratedPassword = Math.random().toString(36).slice(-8);
                            _user.password = 'P' + autoGeneratedPassword;
                            _adminUserBusiness.update(_id, _updateAdminData, function (error, resultUpdate) {
                                if (error)
                                    res.send({ "error": "error", "message": "Authentication error" }); //res.status(401).send({"error": "Authentication error"});
                                else {
                                    var companyId = result._id;
                                    _adminUserBusiness.retrieve(companyId, function (error, resultCompany) {
                                        if (error)
                                            res.send({ "error": "error", "message": "Authentication error" });
                                        else {
                                            var emailresetpassword = Common.EMAIL_TEMPLATE_RESET_ADMIN_PASSWORD;
                                            var emailtemplate = emailresetpassword.replace(/#password#/g, _user.password);
                                            Common.sendMail(result.email, 'support@inteleagent.com', 'Forgot Password', null, emailtemplate, function (error, response) {
                                                if (error) {
                                                    console.log(error);
                                                    res.end("error");
                                                }
                                            });
                                            res.status(201).send({ "success": "done" });
                                        }
                                    });
                                }
                            });
                        }
                    }
                    else {
                        return res.status(401).send({ "error": "Invalid email." });
                    }
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    UserController.prototype.advanceSearch = function (req, res) {
        try {
            console.log(req.body);
            var name = '';
            var email = '';
            var previouscompanyName = '';
            var city = '';
            var phone = '';
            var companyName = '';
            var educational = '';
            var professionalExp = '';
            var totalreview = '';
            var userreviews = [];
            if (req.body.name) {
                name = req.body.name.replace(/^"(.*)"$/, '$1').toLowerCase();
                var fullname = name.split(" ");
            }
            if (req.body.email) {
                email = req.body.email;
            }
            if (req.body.totalreview && req.body.totalreview > 0) {
                totalreview = req.body.totalreview;
            }
            if (req.body.phone) {
                phone = req.body.phone;
            }
            if (req.body.previouscompanyName) {
                previouscompanyName = req.body.previouscompanyName.replace(/^"(.*)"$/, '$1').toLowerCase();
            }
            if (req.body.companyName) {
                companyName = req.body.companyName;
            }
            if (req.body.city) {
                city = req.body.city.toLowerCase();
            }
            if (req.body.educational) {
                educational = req.body.educational;
            }
            if (req.body.expernice) {
                professionalExp = req.body.expernice;
            }
            var queryParams = [];
            if (name) {
                queryParams.push({ $or: [{ 'firstName': fullname[0] }, { 'lastName': fullname[1] }] });
            }
            if (email) {
                queryParams.push({ 'email': email });
            }
            if (phone) {
                queryParams.push({ 'employees.phone': phone });
            }
            if (previouscompanyName) {
                queryParams.push({ 'employees.professionalSummary.company_name': previouscompanyName });
            }
            if (companyName) {
                queryParams.push({ $and: [
                        { 'employees.professionalSummary.currentlyEmployed': 'Yes' }, { 'employees.professionalSummary.company_name': companyName }
                    ] });
            }
            if (city) {
                queryParams.push({ 'employees.currentaddress.0.city': city });
            }
            if (educational) {
                queryParams.push({ 'employees.education.0.degree_name': educational });
            }
            if (professionalExp) {
                queryParams.push({ 'employees.experienceYear': professionalExp });
            }
            if (totalreview) {
                var review = totalreview.toString();
                queryParams.push({ 'employees.totaloverall': review });
                /*
                    var _postreviewBusiness = new PostreviewBusiness();
                    _postreviewBusiness.retrieve("",(error, result) => {
                        if(error){
                        res.send({"error": "error"});
                        } else {
    
                        console.log("result",result);
        
                        var totalstar = 0;
                        result.forEach(function(item,i){
                            if(item.postreviews.length>0){
                                var b =0;
                                for(var a=0; a<item.postreviews.length;a++){
                                    if(item.postreviews[a].status=="verified"){
                                    totalstar =parseFloat(item.postreviews[a].overall)+totalstar;
                                    b++;
                                    }
    
                                let multi = b*5;
                                let data = (totalstar*5)/ multi;
                                console.log("texttotal",data);
                                result[i]['overall'] = data;
                                userreviews = result
                                }
    
                            }
                        });
    
                    }
                    });
                    */
            }
            console.log("queryParams-----", queryParams);
            var _userBusiness = new UserBusiness();
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
                        "companyName": 1,
                        "previouscompanyName": 1,
                        "employees.strengths": 1,
                        "employees.improvements": 1,
                        "employees.summary": 1,
                        "employees.profilePic": 1,
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
                        "employees.totaloverall": 1,
                        "employees.designation": 1
                    }
                },
                {
                    $match: {
                        $and: queryParams
                    }
                }
            ];
            _userBusiness.aggregate(employeeAggregate, function (error, result) {
                if (error) {
                    res.send({ "error": error });
                }
                else {
                    console.log("result====", result);
                    console.log("result====", result);
                    res.send({ "result": result });
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
    UserController.prototype.verifytoken = function (req, res) {
        var _userBusiness = new UserBusiness();
        _userBusiness.verifyToken(req, res, function (companyUserData) {
            res.status(201).send({
                token: "valid"
            });
        });
    };
    //tbd split the incoming query to be {a:b} instead of a=b
    UserController.prototype.count = function (req, res) {
        try {
            var query = req.params.query;
            var _userBusiness = new UserBusiness();
            _userBusiness.count(query, function (error, result) {
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
    /* getdownloadedby */
    UserController.prototype.getdownloadedby = function (req, res) {
        try {
            var _userBusiness = new UserBusiness();
            _userBusiness.verifyToken(req, res, function (userData) {
                var _candidates = req.body;
                var _savedCandidateBusiness = new SavedCandidateBusiness();
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
                            "saved_candidates.downloaded": 1
                        }
                    },
                    {
                        $match: {
                            $and: [
                                { 'saved_candidates.candidate_id': mongoose.Types.ObjectId(req.params._id) },
                            ]
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
                                downloaded: obj.saved_candidates.downloaded
                            };
                        });
                        res.send({ "result": returnObj });
                        console.log("result", returnObj);
                    }
                });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    /*post review */
    UserController.prototype.postReviews = function (req, res) {
        try {
            console.log(req.body);
            var _user = req.body;
            var _employee = req.body;
            var _employeeBusiness = new EmployeeBusiness();
            _user.createdOn = new Date();
            _user.status = "unverified";
            _user.technicalexp = req.body.technicalexp;
            var _postreviewBusiness = new PostreviewBusiness();
            _postreviewBusiness.create(_user, function (error, result) {
                if (error) {
                    console.log("ERROR ON BACKEND CONTROLLER");
                    console.log(error);
                    res.send({ "error": error });
                }
                else {
                    _employee.totaloverall = _employee.totaloverall.toString();
                    _employee.userId = _employee.userId.toString();
                    _employeeBusiness.findOne({ userId: _employee.userId }, function (error, result) {
                        if (error) {
                            res.send({ "error": "error" });
                        }
                        else {
                            console.log("result==", result);
                            var employeeid = result._id;
                            _employeeBusiness.update(mongoose.Types.ObjectId(employeeid), _employee, function (error, resultUpdate) {
                                if (error) {
                                    console.log("error===", error);
                                }
                                else {
                                    console.log("success===", resultUpdate);
                                }
                            });
                        }
                    });
                    res.send(result);
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    UserController.prototype.getReferences = function (req, res) {
        try {
            var _user = req.body;
            var _postreviewBusiness = new PostreviewBusiness();
            _postreviewBusiness.retrieve({ 'userId': _user.userid }, function (error, result) {
                if (error) {
                    res.send({ "error": "error" });
                }
                else {
                    res.send(result);
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    /* get saved candidates */
    UserController.prototype.getSavedCandidates = function (req, res) {
        try {
            var _userBusiness = new UserBusiness();
            _userBusiness.verifyToken(req, res, function (userData) {
                var _candidates = req.body;
                var _savedCandidateBusiness = new SavedCandidateBusiness();
                var _postreviewBusiness = new PostreviewBusiness();
                var candidatesAggregate = [
                    {
                        $lookup: {
                            from: "users",
                            localField: "candidate_id",
                            foreignField: "_id",
                            as: "users"
                        }
                    },
                    {
                        $lookup: {
                            from: "employees",
                            localField: "candidate_id",
                            foreignField: "userId",
                            as: "employees"
                        }
                    },
                    {
                        $lookup: {
                            from: "postreviews",
                            localField: "candidate_id",
                            foreignField: "userId",
                            as: "postreviews"
                        }
                    },
                    {
                        $project: {
                            "_id": 1,
                            "user_id": 1,
                            "downloaded": 1,
                            "candidate_id": 1,
                            "saved": 1,
                            "createdOn": 1,
                            "users._id": 1,
                            "users.firstName": 1,
                            "users.lastName": 1,
                            "users.email": 1,
                            "users.companyName": 1,
                            "users.paidOn": 1,
                            "users.previouscompanyName": 1,
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
                            "employees.expectedsalaryflag": 1,
                            "employees.currentsalaryflag": 1,
                            "employees.openRelocation": 1,
                            "employees.openTravel": 1,
                            "employees.sponsorshipRequired": 1,
                            "employees.authorization": 1,
                            "employees.felony": 1,
                            "employees.phone": 1,
                            "employees.designation": 1,
                            "employees.alternateMobile_number": 1,
                            "employees.currentaddress": 1,
                            "employees.permanentaddress": 1,
                            "employees.defoultsocial_media": 1,
                            "employees.skills": 1,
                            "employees.experienceYear": 1,
                            "employees.experienceMonth": 1,
                            "employees.social_media": 1,
                            "employees.professionalSummary": 1,
                            "postreviews.overall": 1,
                            "postreviews.status": 1
                        }
                    },
                    {
                        $match: {
                            $and: [
                                { 'user_id': mongoose.Types.ObjectId(userData._id) }
                            ]
                        }
                    },
                    {
                        $sort: { createdOn: -1 }
                    }
                ];
                _savedCandidateBusiness.aggregate(candidatesAggregate, function (error, result) {
                    if (error) {
                        res.send({ "error": error });
                    }
                    else {
                        var returnObj = result.map(function (obj) {
                            var datevalue = new moment(obj.createdOn, "YYYY-MM-DD");
                            var createdOn = moment(datevalue).format("MM DD YYYY");
                            var expernice = 0;
                            if (obj.employees[0] && obj.employees[0].experienceYear) {
                                expernice = obj.employees[0] && obj.employees[0].experienceYear;
                            }
                            return {
                                id: obj._id,
                                saved: obj.saved,
                                downloaded: obj.downloaded,
                                candidate_id: obj.candidate_id,
                                createdOn: createdOn,
                                userId: obj.users[0] && obj.users[0]._id,
                                firstName: obj.users[0] && obj.users[0].firstName,
                                lastName: obj.users[0] && obj.users[0].lastName,
                                email: obj.users[0] && obj.users[0].email,
                                paidOn: obj.users[0] && obj.users[0].paidOn,
                                companyName: obj.users[0] && obj.users[0].companyName,
                                previouscompanyName: obj.users[0] && obj.users[0].previouscompanyName,
                                alternateEmail: obj.employees[0] && obj.employees[0].alternateEmail,
                                summary: obj.employees[0] && obj.employees[0].summary,
                                profilePic: obj.employees[0] && obj.employees[0].profilePic,
                                profileCover: obj.employees[0] && obj.employees[0].profileCover,
                                education: obj.employees[0] && obj.employees[0].education,
                                dateofBirth: obj.employees[0] && obj.employees[0].dateofBirth,
                                currentSalary: obj.employees[0] && obj.employees[0].currentSalary,
                                expectedSalary: obj.employees[0] && obj.employees[0].expectedSalary,
                                currentlyEmployed: obj.employees[0] && obj.employees[0].currentlyEmployed,
                                openRelocation: obj.employees[0] && obj.employees[0].openRelocation,
                                openTravel: obj.employees[0] && obj.employees[0].openTravel,
                                sponsorshipRequired: obj.employees[0] && obj.employees[0].sponsorshipRequired,
                                felony: obj.employees[0] && obj.employees[0].felony,
                                phone: obj.employees[0] && obj.employees[0].phone,
                                gender: obj.employees[0] && obj.employees[0].gender,
                                resume: obj.employees[0] && obj.employees[0].resume,
                                alternateMobile_number: obj.employees[0] && obj.employees[0].alternateMobile_number,
                                currentaddress: obj.employees[0] && obj.employees[0].currentaddress,
                                permanentaddress: obj.employees[0] && obj.employees[0].permanentaddress,
                                defoultsocial_media: obj.employees[0] && obj.employees[0].defoultsocial_media,
                                skills: obj.employees[0] && obj.employees[0].skills,
                                authorization: obj.employees[0] && obj.employees[0].authorization,
                                experienceMonth: obj.employees[0] && obj.employees[0].experienceMonth,
                                experienceYear: expernice,
                                social_media: obj.employees[0] && obj.employees[0].social_media,
                                professionalSummary: obj.employees[0] && obj.employees[0].professionalSummary,
                                strengths: obj.employees[0] && obj.employees[0].strengths,
                                improvements: obj.employees[0] && obj.employees[0].improvements,
                                overall: obj.postreviews,
                                designation: obj.employees[0] && obj.employees[0].designation
                            };
                        });
                        //	console.log("returnObj====",returnObj);
                        res.send({ "result": returnObj });
                    }
                });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    return UserController;
}());
module.exports = UserController;
//# sourceMappingURL=UserController.js.map