"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Authen_1 = require("../middleware/Authen");
const taskService_1 = __importDefault(require("../services/taskService"));
const BaseRouter_1 = require("./BaseRouter");
/**
 * @description TaskRouter
 */
class TaskRouter extends BaseRouter_1.BaseRouter {
    constructor() {
        super();
        this.taskService = taskService_1.default;
        this.init();
    }
    /**
     * Connect routes to their matching controller endpoints.
     */
    init() {
        this.router.get("/GetAll", Authen_1.authen, this.taskService.getAll);
        this.router.post("/Save", Authen_1.authen, this.taskService.Save);
        this.router.delete("/Delete", Authen_1.authen, this.taskService.Delete);
        this.router.delete("/Archive", Authen_1.authen, this.taskService.archive);
        this.router.post("/DeArchive", Authen_1.authen, this.taskService.deArchive);
    }
}
module.exports = new TaskRouter().router;
//# sourceMappingURL=taskRouter.js.map