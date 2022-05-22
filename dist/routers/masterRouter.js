"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const authLoginRouter_1 = __importDefault(require("./authLoginRouter"));
const baseRouter_1 = require("./baseRouter");
const bodyParser = require("body-parser");
const userRouter = require("./userRouter");
const roleRouter = require("./roleRouter");
const taskRouter = require("./taskRouter");
const projectRouter = require("./projectRouter");
const myworkingtimeRouter = require("./myworkingtimeRouter");
const workingtimeRouter = require("./workingtimeRouter");
const commentRouter = require("./commentRouter");
class MasterRouter extends baseRouter_1.BaseRouter {
    constructor() {
        super();
        this.configure();
        this.init();
    }
    configure() {
        this.router.use(bodyParser.json()); // to support JSON-encoded bodies
        this.router.use(bodyParser.urlencoded({
            // to support URL-encoded bodies
            extended: true,
        }));
    }
    /**
     * Connect routes to their matching routers.
     */
    init() {
        this.router.use("/services/app", authLoginRouter_1.default);
        this.router.use("/TokenAuth", authLoginRouter_1.default);
        this.router.use("/User", userRouter);
        this.router.use("/Role", roleRouter);
        this.router.use("/Task", taskRouter);
        this.router.use("/Project", projectRouter);
        this.router.use("/Myworkingtime", myworkingtimeRouter);
        this.router.use("/Workingtime", workingtimeRouter);
        this.router.use("/Comment", commentRouter);
    }
}
module.exports = new MasterRouter().router;
//# sourceMappingURL=masterRouter.js.map