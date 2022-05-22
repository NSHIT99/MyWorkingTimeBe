import { authen } from "../middleware/Authen";
import { mp3 } from "../middleware/uploadFile";
import userService from "../services/userService";
import { BaseRouter } from "./baseRouter";

/**
 * @description UserRouter
 */
class UserRouter extends BaseRouter {
  private userService = userService;

  constructor() {
    super();
    this.init();
  }

  /**
   * Connect routes to their matching controller endpoints.
   */
  protected init() {
    this.router.post("/CreateUser", authen, this.userService.createUser);
    this.router.put("/UpdateUser", authen, this.userService.updateUser);
    this.router.delete("/DeleteUser", authen, this.userService.deleteUser);
    this.router.get("/GetAllPagging", authen, this.userService.getAllPagging);
    this.router.get("/GetAll", authen, this.userService.getAll);
    this.router.post(
      "/createAvatar",
      mp3.single("File"),
      this.userService.createAvatar
    );
    this.router.post("/UpdateAvatar", authen, this.userService.updateAvatar);
    this.router.post("/ResetPassword", authen, this.userService.resetPassword);
    this.router.get(
      "/GetUserNotPagging",
      authen,
      this.userService.getUserNotPagging
    );
  }
}

export = new UserRouter().router;
