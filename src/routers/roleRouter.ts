import { authen } from "../middleware/Authen";
import roleService from "../services/roleService";
import { BaseRouter } from "./baseRouter";

/**
 * @description RoleRouter
 */
class RoleRouter extends BaseRouter {
  private roleService = roleService;

  constructor() {
    super();
    this.init();
  }

  /**
   * Connect routes to their matching controller endpoints.
   */
  protected init() {
    this.router.post("/Create", authen, this.roleService.create);
    this.router.post("/Update", authen, this.roleService.update);
    this.router.delete("/Delete", authen, this.roleService.delete);
    this.router.get("/GetAll", authen, this.roleService.getAll);
  }
}

export = new RoleRouter().router;
