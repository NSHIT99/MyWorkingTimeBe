import fs = require("fs");
import { authen } from "../middleware/Authen";
import myworkingtimeService = require("../services/myworkingtimeService");
import { BaseRouter } from "./baseRouter";

/**
 * @description ProjectRouter
 */
class ProjectRouter extends BaseRouter {
  private myworkingtimeService = myworkingtimeService;

  constructor() {
    super();
    this.init();
  }

  /**
   * Connect routes to their matching projectService endpoints.
   */
  protected init() {
    this.router.post("/Create", this.myworkingtimeService.create);
    this.router.post("/Update", this.myworkingtimeService.update);
    this.router.delete("/Delete", this.myworkingtimeService.delete);
    this.router.get("/Get", this.myworkingtimeService.get);
    this.router.post("/SubmitToPending", this.myworkingtimeService.submitToPending);
    this.router.post("/SaveAndReset", this.myworkingtimeService.saveandreset);
    this.router.get("/GetWorkingtimeOfUser", this.myworkingtimeService.getWorkingtimeOfUser);
  }
}

export = new ProjectRouter().router;