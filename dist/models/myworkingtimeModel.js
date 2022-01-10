"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Myworkingtime = exports.MyworkingtimeSchema = void 0;
const mongoose_1 = require("mongoose");
const myWorkingtimeType_1 = require("../type/myWorkingtimeType");
exports.MyworkingtimeSchema = new mongoose_1.Schema({
    _id: mongoose_1.Types.ObjectId,
    projectTaskId: { type: Number },
    note: { type: String, require: true },
    workingTime: { type: Number, require: true },
    typeOfWork: { type: Number, enum: Object.values(myWorkingtimeType_1.typeOfWork) },
    dateAt: { type: Date },
    status: { type: Number, enum: Object.values(myWorkingtimeType_1.status) },
    id: { type: Number, require: true, unique: true },
    userId: { type: Number },
}, {
    timestamps: true,
});
exports.Myworkingtime = (0, mongoose_1.model)("Myworkingtime", exports.MyworkingtimeSchema, "myworkingtimes");
//# sourceMappingURL=myworkingtimeModel.js.map