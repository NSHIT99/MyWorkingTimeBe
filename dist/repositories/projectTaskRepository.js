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
const mongoose_1 = require("mongoose");
const projectTaskModel_1 = require("../Models/projectTaskModel");
const baseRepository_1 = require("./baseRepository");
class ProjectTaskRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super("ProjectTask", projectTaskModel_1.ProjectTaskSchema);
    }
    createProjectTask(taskId, projectId, billable, timeStartTask, timeEndTask) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (yield this.lastId()) + 1;
            const newProjectTask = new projectTaskModel_1.ProjectTask({
                _id: mongoose_1.Types.ObjectId(),
                projectId,
                taskId,
                billable,
                id,
                timeStartTask,
                timeEndTask,
            });
            try {
                yield newProjectTask.save();
                return this.findById(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteTaskProject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield projectTaskModel_1.ProjectTask.deleteOne({ id: id });
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByProjectId(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let project = yield projectTaskModel_1.ProjectTask.find({ projectId });
                return project;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByIdTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield projectTaskModel_1.ProjectTask.findById({ taskId });
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findAndUpdate(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkId = yield projectTaskModel_1.ProjectTask.find({ taskId });
                checkId.map((item) => __awaiter(this, void 0, void 0, function* () {
                    yield projectTaskModel_1.ProjectTask.findByIdAndUpdate({ _id: item._id }, { confirm: true });
                }));
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
module.exports = new ProjectTaskRepository();
//# sourceMappingURL=ProjectTaskRepository.js.map