"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadOne = void 0;
const util_1 = __importDefault(require("util"));
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const multerConst = {
    maxSize: 1024 * 1024 * 5,
    fileMime: ['image/jpg', 'image/png', 'image/jpeg', 'application/octet-stream'],
    fileExt: ['.jpg', '.png', '.jpeg', '.mp4', '.mov', '.flv', '.wmv', '.avi'],
};
class MulterConfig {
    constructor() {
        this.storage = multer_1.default.diskStorage({
            destination: (req, file, cb) => {
                try {
                    const dir = './public/avatars/';
                    fs_1.default.mkdirSync(dir, { recursive: true });
                    cb(null, dir);
                }
                catch (error) {
                    cb(error, null);
                }
            },
            filename: (req, file, cb) => {
                cb(null, (0, uuid_1.v4)() + '-' + file.originalname);
            },
        });
        this.fileFilter = (req, file, cb) => {
            try {
                console.log(file.mimetype);
                console.log(path_1.default.extname(file.originalname));
                const mime = multerConst.fileMime.includes(file.mimetype);
                const ext = multerConst.fileExt.includes(path_1.default.extname(file.originalname));
                if (mime && ext)
                    return cb(null, true);
                return cb(new Error('Only images are allowed'));
            }
            catch (error) {
                return cb(error, false);
            }
        };
        this.upload = (0, multer_1.default)({
            storage: this.storage,
            fileFilter: this.fileFilter,
            limits: { fileSize: 1024 * 1024 * 5 },
        });
    }
}
var upload = new MulterConfig().upload;
exports.uploadOne = util_1.default.promisify(upload.single('file'));
//# sourceMappingURL=uploadFile.js.map