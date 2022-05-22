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
const commentRepository_1 = __importDefault(require("../repositories/commentRepository"));
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
class CommentService {
    constructor() {
        this.commentRepository = commentRepository_1.default;
        this.userRepository = userRepository_1.default;
        this.default = (req, res, next) => { };
        this.createCommeent = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let comment = req.body;
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
                let newComment = yield this.commentRepository.createComment(comment, userId);
                newComment = (0, get_1.default)(newComment, ["id", "idWorkingtime", "title", "userId"]);
                response = Object.assign(Object.assign({}, response), { result: newComment, success: true });
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
        this.updateComment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let comment = req.body;
            let response = {
                result: null,
                targetUrl: null,
                success: false,
                error: null,
                unAuthRequest: false,
                __abp: true,
            };
            try {
                yield this.commentRepository.findById(comment.id);
                let updateComment = yield this.commentRepository.update(comment);
                updateComment = (0, get_1.default)(updateComment, [
                    "id",
                    "idWorkingtime",
                    "title",
                    "userId",
                ]);
                response = Object.assign(Object.assign({}, response), { result: updateComment, success: true });
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
        this.Delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
                const deleteComment = yield this.commentRepository.delete(parseInt(id));
                response = Object.assign(Object.assign({}, response), { result: "Delete comment successfully", success: true });
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let response = {
                result: null,
                targetUrl: null,
                success: false,
                error: null,
                unAuthRequest: false,
                __abp: true,
            };
            try {
                let getComment = yield this.commentRepository.findAll();
                response = Object.assign(Object.assign({}, response), { success: true, result: getComment });
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
        this.get = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const idWorkingtime = req.query.idWorkingtime;
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
                let comment = yield this.commentRepository.findIdWorkingtime(parseInt(idWorkingtime));
                const user = yield this.userRepository.findById(comment.userId);
                comment = (0, get_1.default)(comment, ["id", "idWorkingtime", "title", "userId"]);
                result.push(Object.assign(Object.assign({}, comment), { username: user.fullName }));
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
module.exports = new CommentService();
//# sourceMappingURL=commentService.js.map