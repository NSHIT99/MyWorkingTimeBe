"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const get_1 = __importDefault(require("../middleware/get"));
const ProjectRepository_1 = __importDefault(require("../repositories/ProjectRepository"));
const ProjectTaskRepository_1 = __importDefault(require("../repositories/ProjectTaskRepository"));
const taskRepository_1 = __importDefault(require("../repositories/taskRepository"));
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const myworkingtimeRepository_1 = __importDefault(require("../repositories/myworkingtimeRepository"));
const userType_1 = require("../type/userType");
const projectUserRepository_1 = __importDefault(require("../repositories/projectUserRepository"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
class MyworkingtimeService {
    constructor() {
        this.myworkingtimeRepository = myworkingtimeRepository_1.default;
        this.projectRepository = ProjectRepository_1.default;
        this.projectTaskRepository = ProjectTaskRepository_1.default;
        this.projectUserRepository = projectUserRepository_1.default;
        this.taskRepository = taskRepository_1.default;
        this.userRepository = userRepository_1.default;
        this.default = (req, res, next) => { };
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let myworkingtime = req.body;
            let response = {
                result: null,
                targetUrl: null,
                success: false,
                error: null,
                unAuthRequest: false,
                __abp: true,
            };
            try {
                if (myworkingtime.workingTime <= 8) {
                    let newMyworkingtime = yield this.myworkingtimeRepository.createMyworkingtime(myworkingtime);
                    newMyworkingtime = (0, get_1.default)(newMyworkingtime, [
                        "projectTaskId",
                        "note",
                        "workingTime",
                        "status",
                        "typeOfWork",
                        "dateAt",
                        "id",
                        "userId",
                    ]);
                    response = Object.assign(Object.assign({}, response), { result: Object.assign({}, newMyworkingtime), success: true });
                    res.status(200).json(response);
                }
                else {
                    response = Object.assign(Object.assign({}, response), { error: {
                            code: 0,
                            message: `total normal working time on ${myworkingtime.dateAt} can't  > 8 hours`,
                            details: null,
                            validationErrors: null,
                        } });
                    res.status(200).json(response);
                }
            }
            catch (error) {
                throw error;
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const myworkingtime = req.body;
            let response = {
                result: null,
                targetUrl: null,
                success: false,
                error: null,
                unAuthRequest: false,
                __abp: true,
            };
            try {
                if (myworkingtime.workingTime <= 8) {
                    yield this.myworkingtimeRepository.findById(myworkingtime.id);
                    let editMyworkingtime = yield this.myworkingtimeRepository.update(myworkingtime);
                    editMyworkingtime = (0, get_1.default)(editMyworkingtime, [
                        "projectTaskId",
                        "note",
                        "workingTime",
                        "status",
                        "typeOfWork",
                        "dateAt",
                        "id",
                    ]);
                    response = Object.assign(Object.assign({}, response), { result: editMyworkingtime, success: true });
                    res.status(200).json(response);
                }
                else {
                    response = Object.assign(Object.assign({}, response), { error: {
                            code: 0,
                            message: `total normal working time on ${myworkingtime.dateAt} can't  > 8 hours`,
                            details: null,
                            validationErrors: null,
                        } });
                    res.status(500).json(response);
                }
            }
            catch (error) {
                throw error;
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = req.query.id;
            let response = {
                result: null,
                targetUrl: null,
                success: false,
                error: null,
                unAuthRequest: false,
                __abp: true,
            };
            try {
                if (yield this.myworkingtimeRepository.findById(parseInt(id))) {
                    yield this.myworkingtimeRepository.deleteMyworkingtime(parseInt(id));
                    response = Object.assign(Object.assign({}, response), { result: "delete myworkingtime successfully", success: true });
                    res.status(200).json(response);
                }
                else {
                    response = Object.assign(Object.assign({}, response), { error: {
                            code: 0,
                            message: `Not found ${id}!`,
                            details: null,
                            validationErrors: null,
                        } });
                    res.status(500).json(response);
                }
            }
            catch (error) {
                next(error);
            }
        });
        this.get = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = req.query.id;
            let response = {
                result: null,
                targetUrl: null,
                success: false,
                error: null,
                unAuthRequest: false,
                __abp: true,
            };
            try {
                let myworkingtime = yield this.myworkingtimeRepository.findById(parseInt(id));
                myworkingtime = (0, get_1.default)(myworkingtime, [
                    "projectTaskId",
                    "note",
                    "workingTime",
                    "typeOfWork",
                    "dateAt",
                    "status",
                    "id",
                ]);
                response = Object.assign(Object.assign({}, response), { result: myworkingtime, success: true });
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
        this.submitToPending = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let { startDate, endDate } = req.body;
            let response = {
                result: null,
                targetUrl: null,
                success: false,
                error: null,
                unAuthRequest: false,
                __abp: true,
            };
            try {
                const decoded = (0, jwt_decode_1.default)(req.headers.authorization.split(" ")[1]);
                const userId = decoded.id;
                let countMyworkingtime = 0;
                let myworkingtime = yield this.myworkingtimeRepository.getMyworkingtimeOfUser(startDate, endDate, userId);
                for (let item of myworkingtime) {
                    if (item.status == 0) {
                        countMyworkingtime++;
                        item.status = 1;
                        yield this.myworkingtimeRepository.update(item);
                    }
                }
                response = Object.assign(Object.assign({}, response), { success: true, result: `Submit success ${countMyworkingtime} timesheets` });
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
        this.saveandreset = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const myworkingtime = req.body;
            let response = {
                result: null,
                targetUrl: null,
                success: false,
                error: null,
                unAuthRequest: false,
                __abp: true,
            };
            try {
                if (myworkingtime.workingTime <= 8 && myworkingtime.status == 3) {
                    yield this.myworkingtimeRepository.findById(myworkingtime.id);
                    myworkingtime.status = 2;
                    let SaveAndReset = yield this.myworkingtimeRepository.SaveAndUpdate(myworkingtime);
                    SaveAndReset = (0, get_1.default)(SaveAndReset, [
                        "projectTaskId",
                        "note",
                        "workingTime",
                        "status",
                        "targetUserWorkingTime",
                        "typeOfWork",
                        "isCharged",
                        "dateAt",
                        "projectTargetUserId",
                        "id",
                    ]);
                    response = Object.assign(Object.assign({}, response), { result: Object.assign({}, SaveAndReset), success: true });
                    res.status(200).json(response);
                }
                else {
                    response = Object.assign(Object.assign({}, response), { error: {
                            code: 0,
                            message: `total normal working time on ${myworkingtime.dateAt} can't  > 8 hours`,
                            details: null,
                            validationErrors: null,
                        } });
                }
                res.status(500).json(response);
            }
            catch (error) {
                throw error;
            }
        });
        this.getWorkingtimeOfUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let { startDate, endDate, userId } = req.query;
            let response = {
                result: null,
                targetUrl: null,
                success: false,
                error: null,
                unAuthRequest: false,
                __abp: true,
            };
            try {
                let workingtimes = yield this.myworkingtimeRepository.getMyworkingtimeOfUser(startDate.toString(), endDate.toString(), Number(userId));
                let result = [];
                for (let workingtime of workingtimes) {
                    workingtime = (0, get_1.default)(workingtime, [
                        "id",
                        "projectTaskId",
                        "dateAt",
                        "workingTime",
                        "status",
                        "note",
                        "typeOfWork",
                        "isCharged",
                        "billable",
                    ]);
                    let projectTask = yield this.projectTaskRepository.findById(workingtime.projectTaskId);
                    let project = yield this.projectRepository.findById(projectTask.projectId);
                    let task = yield this.taskRepository.findById(projectTask.taskId);
                    let getall = Object.assign(Object.assign({}, workingtimes), { projectName: project.name, taskName: task.name, projectCode: project.code, billable: projectTask.billable });
                    result.push(getall);
                }
                response = Object.assign(Object.assign({}, response), { result: result, success: true });
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
        this.approveWorkingtime = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let idApprove = req.body;
            let response = {
                result: null,
                targetUrl: null,
                success: false,
                error: null,
                unAuthRequest: false,
                __abp: true,
            };
            try {
                let failedcount = 0;
                let successcount = 0;
                let lockdate = new Date().toLocaleDateString();
                for (let id of idApprove) {
                    if (yield this.myworkingtimeRepository.findById(id)) {
                        yield this.myworkingtimeRepository.ApproveMyworkingtimes(id);
                        successcount++;
                    }
                    else
                        failedcount++;
                }
                response = Object.assign(Object.assign({}, response), { result: {
                        success: ` - Success ${successcount} workingtimes.`,
                        successCount: successcount,
                        failedCount: failedcount,
                        fail: ` - Fail ${failedcount} workingtimes.`,
                        lockDate: ` - Locked date: ${lockdate}.`,
                    } });
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
        this.rejectWorkingtime = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let idReject = req.body;
            let response = {
                result: null,
                targetUrl: null,
                success: false,
                error: null,
                unAuthRequest: false,
                __abp: true,
            };
            try {
                let failedcount = 0;
                let successcount = 0;
                let lockdate = new Date().toLocaleDateString();
                for (let id of idReject) {
                    if (yield this.myworkingtimeRepository.findById(id)) {
                        yield this.myworkingtimeRepository.RejectMyworkingtimes(id);
                        successcount++;
                    }
                    else
                        failedcount++;
                }
                response = Object.assign(Object.assign({}, response), { result: {
                        fail: ` - Fail ${failedcount} workingtimes.`,
                        lockDate: ` - Locked date: ${lockdate}.`,
                        success: ` - Success ${successcount} workingtimes.`,
                    } });
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let { startDate, endDate, status } = req.query;
            let response = {
                result: null,
                targetUrl: null,
                success: false,
                error: null,
                unAuthRequest: false,
                __abp: true,
            };
            try {
                let myworkingtime = yield this.myworkingtimeRepository.getAllMyworkingtime(startDate.toString(), endDate.toString(), Number(status));
                let result = [];
                for (let item of myworkingtime) {
                    let user = yield this.userRepository.findById(item.userId);
                    let myworkingtimes = (0, get_1.default)(item, [
                        "id",
                        "dateAt",
                        "workingTime",
                        "status",
                        "typeOfWork",
                        "userId",
                    ]);
                    let projectTask = yield this.projectTaskRepository.findById(item.projectTaskId);
                    let project = yield this.projectRepository.findById(projectTask.projectId);
                    let task = yield this.taskRepository.findById(projectTask.taskId);
                    let pms = yield this.userRepository.getManageProject(project.id);
                    result.push(Object.assign(Object.assign({ branch: user.branch, branchName: userType_1.Branch[user.branch] }, myworkingtimes), { isUserInProject: true, listPM: pms, mytimesheetNote: item.note, projectCode: project.code, project: project.id, projectName: project.name, taskId: task.id, task: task.name, type: userType_1.UserType[user.type], avatarPath: user.avatarPath, user: user.name }));
                }
                response = Object.assign(Object.assign({}, response), { success: true, result: result });
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
        this.getProjectsInTasks = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const decoded = (0, jwt_decode_1.default)(req.headers.authorization.split(" ")[1]);
            const userId = decoded.id;
            let response = {
                result: null,
                targetUrl: null,
                success: false,
                error: null,
                unAuthRequest: false,
                __abp: true,
            };
            try {
                let result = [];
                let projectUser = yield this.projectUserRepository.findByUserId(+userId);
                yield Promise.all(projectUser.map((item) => __awaiter(this, void 0, void 0, function* () {
                    let project = yield this.projectRepository.findById(item.projectId);
                    let projectTask = yield this.projectTaskRepository.findByProjectId(item.projectId);
                    let pms = yield this.userRepository.getManageProject(project.id);
                    let tasks = [];
                    yield Promise.all(projectTask.map((item) => __awaiter(this, void 0, void 0, function* () {
                        let task = yield this.taskRepository.findById(item.taskId);
                        if (task)
                            tasks.push({
                                projectTaskId: task.id,
                                taskName: task.name,
                            });
                    })));
                    result.push({
                        projectName: project.name,
                        projectCode: project.code,
                        listPM: pms,
                        tasks: tasks,
                    });
                    return result;
                })));
                response = Object.assign(Object.assign({}, response), { success: true, result: result });
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
    defaultMethod(req, res, next) {
        throw new Error("Method not implemented.");
    }
}
module.exports = new MyworkingtimeService();
//# sourceMappingURL=myworkingtimeService.js.map