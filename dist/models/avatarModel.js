"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Avatar = exports.AvatarSchema = void 0;
const mongoose_1 = require("mongoose");
exports.AvatarSchema = new mongoose_1.Schema({
    id: { type: Number, require: true, unique: true },
    filename: { type: String, require: true, unique: true },
    fieldname: { type: String, require: true, unique: true },
    originalname: { type: String, require: true, unique: true },
    encoding: { type: String, require: true, unique: true },
    mimetype: { type: String, require: true, unique: true },
    destination: { type: String, require: true, unique: true },
    path: { type: String, require: true, unique: true },
    size: { type: Number, require: true, unique: true },
}, {
    timestamps: true,
});
exports.Avatar = (0, mongoose_1.model)("avatar", exports.AvatarSchema, "avatars");
//# sourceMappingURL=avatarModel.js.map