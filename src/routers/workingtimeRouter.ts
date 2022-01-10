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
    this.router.post("/ApproveWorkingtimes", this.myworkingtimeService.approveWorkingtime);
    this.router.post("/RejectWorkingtimes", this.myworkingtimeService.rejectWorkingtime);
    this.router.get("/GetAll", this.myworkingtimeService.getAll);
  }
}

export = new ProjectRouter().router;