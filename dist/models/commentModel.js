"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = exports.CommentSchema = void 0;
const mongoose_1 = require("mongoose");
exports.CommentSchema = new mongoose_1.Schema({
    id: { type: Number, require: true, unique: true },
    idWorkingtime: { type: Number, require: true, unique: true },
    title: { type: String, require: true, unique: true },
    userId: { type: Number, require: true, unique: true },
}, {
    timestamps: true,
});
exports.Comment = (0, mongoose_1.model)("Comment", exports.CommentSchema, "comments");
//# sourceMappingURL=commentModel.js.map