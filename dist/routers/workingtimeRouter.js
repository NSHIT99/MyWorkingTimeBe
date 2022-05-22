"use strict";
const Authen_1 = require("../middleware/Authen");
const myworkingtimeService = require("../services/myworkingtimeService");
const baseRouter_1 = require("./baseRouter");
/**
 * @description ProjectRouter
 */
class ProjectRouter extends baseRouter_1.BaseRouter {
    constructor() {
        super();
        this.myworkingtimeService = myworkingtimeService;
        this.init();
    }
    /**
     * Connect routes to their matching projectService endpoints.
     */
    init() {
        this.router.post("/ApproveWorkingtimes", Authen_1.authen, this.myworkingtimeService.approveWorkingtime);
        this.router.post("/RejectWorkingtimes", Authen_1.authen, this.myworkingtimeService.rejectWorkingtime);
        this.router.get("/GetAll", Authen_1.authen, this.myworkingtimeService.getAll);
    }
}
module.exports = new ProjectRouter().router;
//# sourceMappingURL=workingtimeRouter.js.map