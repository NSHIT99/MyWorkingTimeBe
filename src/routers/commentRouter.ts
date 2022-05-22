import { authen } from "../middleware/Authen";
import commentService from "../services/commentService";
import { BaseRouter } from "./BaseRouter";

/**
 * @description CommentRouter
 */
class CommentRouter extends BaseRouter {
  private commentService = commentService;

  constructor() {
    super();
    this.init();
  }

  /**
   * Connect routes to their matching controller endpoints.
   */
  protected init() {
    // this.router.get("/GetAll", authen, this.commentService.getAll);
    this.router.post("/Create", authen, this.commentService.createCommeent);
    this.router.post("/Update", authen, this.commentService.updateComment);
    this.router.delete("/Delete", authen, this.commentService.Delete);
    this.router.get("/GetAll", authen, this.commentService.getAll);
    this.router.get("/get", authen, this.commentService.get);
  }
}

export = new CommentRouter().router;
