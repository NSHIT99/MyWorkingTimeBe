"use strict";
const baseRouter_1 = require("./baseRouter");
const Authen_1 = require("../middleware/Authen");
const projectService = require("../services/projectService");
/**
 * @description ProjectRouter
 */
class ProjectRouter extends baseRouter_1.BaseRouter {
    constructor() {
        super();
        this.projectService = projectService;
        this.init();
    }
    /**
     * Connect routes to their matching projectService endpoints.
     */
    init() {
        this.router.post("/Save", Authen_1.authen, this.projectService.Save);
        this.router.delete("/Delete", Authen_1.authen, this.projectService.Delete);
        this.router.post("/Active", Authen_1.authen, this.projectService.active);
        this.router.post("/Inactive", Authen_1.authen, this.projectService.Inactive);
        this.router.get("/getAll", Authen_1.authen, this.projectService.getAll);
        this.router.get("/get", Authen_1.authen, this.projectService.get);
    }
}
module.exports = new ProjectRouter().router;
//# sourceMappingURL=projectRouter.js.map