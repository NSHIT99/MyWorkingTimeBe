import fs = require("fs");
import { BaseRouter } from "./baseRouter";
import { authen } from "../middleware/Authen";
import projectService = require("../services/projectService");

/**
 * @description ProjectRouter
 */
class ProjectRouter extends BaseRouter {
  private projectService = projectService;

  constructor() {
    super();
    this.init();
  }

  /**
   * Connect routes to their matching projectService endpoints.
   */
  protected init() {
    this.router.post("/Save", authen, this.projectService.Save);
    this.router.delete("/Delete", authen, this.projectService.Delete);
    this.router.post("/Active", authen, this.projectService.active);
    this.router.post("/Inactive", authen, this.projectService.Inactive);
    this.router.get("/getAll", authen, this.projectService.getAll);
    this.router.get("/get", authen, this.projectService.get);
  }
}

export = new ProjectRouter().router;