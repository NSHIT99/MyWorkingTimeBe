"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectTask = exports.ProjectTaskSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ProjectTaskSchema = new mongoose_1.Schema({
    _id: mongoose_1.Types.ObjectId,
    projectId: { type: Number },
    taskId: { type: Number },
    billable: { type: Boolean },
    id: { type: Number },
    timeStartTask: { type: Date, default: Date.now },
    timeEndTask: { type: Date, default: Date.now },
    confirm: { type: Boolean, default: false },
}, {
    timestamps: true,
});
exports.ProjectTask = (0, mongoose_1.model)("ProjectTask", exports.ProjectTaskSchema, "projecttasks");
//# sourceMappingURL=projectTaskModel.js.map