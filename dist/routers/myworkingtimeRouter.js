"use strict";
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
        this.router.post("/Create", this.myworkingtimeService.create);
        this.router.post("/Update", this.myworkingtimeService.update);
        this.router.delete("/Delete", this.myworkingtimeService.delete);
        this.router.get("/Get", this.myworkingtimeService.get);
        this.router.post("/SubmitToPending", this.myworkingtimeService.submitToPending);
        this.router.post("/SaveAndReset", this.myworkingtimeService.saveandreset);
        this.router.get("/GetWorkingtimeOfUser", this.myworkingtimeService.getWorkingtimeOfUser);
    }
}
module.exports = new ProjectRouter().router;
//# sourceMappingURL=myworkingtimeRouter.js.map