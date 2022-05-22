import { authen } from "../middleware/Authen";
import taskService from "../services/taskService";
import { BaseRouter } from "./BaseRouter";

/**
 * @description TaskRouter
 */
class TaskRouter extends BaseRouter {
  private taskService = taskService;

  constructor() {
    super();
    this.init();
  }

  /**
   * Connect routes to their matching controller endpoints.
   */
  protected init() {
    this.router.get("/GetAll", authen, this.taskService.getAll);
    this.router.post("/Save", authen, this.taskService.Save);
    this.router.delete("/Delete", authen, this.taskService.Delete);
    this.router.delete("/Archive", authen, this.taskService.archive);
    this.router.post("/DeArchive", authen, this.taskService.deArchive);
  }
}

export = new TaskRouter().router;
