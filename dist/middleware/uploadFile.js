"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mp3 = void 0;
const multer_1 = __importDefault(require("multer"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/images");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + ".png");
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(new Error("You can only upload png, jpeg, jpg file"), false);
    }
};
exports.mp3 = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10,
    },
    fileFilter: fileFilter,
});
//# sourceMappingURL=uploadFile.js.map