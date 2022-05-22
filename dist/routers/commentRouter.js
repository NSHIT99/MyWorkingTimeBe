"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Authen_1 = require("../middleware/Authen");
const commentService_1 = __importDefault(require("../services/commentService"));
const BaseRouter_1 = require("./BaseRouter");
/**
 * @description CommentRouter
 */
class CommentRouter extends BaseRouter_1.BaseRouter {
    constructor() {
        super();
        this.commentService = commentService_1.default;
        this.init();
    }
    /**
     * Connect routes to their matching controller endpoints.
     */
    init() {
        // this.router.get("/GetAll", authen, this.commentService.getAll);
        this.router.post("/Create", Authen_1.authen, this.commentService.createCommeent);
        this.router.post("/Update", Authen_1.authen, this.commentService.updateComment);
        this.router.delete("/Delete", Authen_1.authen, this.commentService.Delete);
        this.router.get("/GetAll", Authen_1.authen, this.commentService.getAll);
        this.router.get("/get", Authen_1.authen, this.commentService.get);
    }
}
module.exports = new CommentRouter().router;
//# sourceMappingURL=commentRouter.js.map