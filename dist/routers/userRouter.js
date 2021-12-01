"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const userService_1 = __importDefault(require("../services/userService"));
const baseRouter_1 = require("./baseRouter");
/**
 * @description UserRouter
 */
class UserRouter extends baseRouter_1.BaseRouter {
    constructor() {
        super();
        this.userService = userService_1.default;
        this.init();
    }
    /**
     * Connect routes to their matching controller endpoints.
     */
    init() {
        this.router.post("/CreateUser", this.userService.createUser);
        this.router.put("/UpdateUser/:id", this.userService.updateUser);
        this.router.delete("/DeleteUser", this.userService.deleteUser);
        this.router.get("/GetAllPagging", this.userService.getAllPagging);
        this.router.get("/GetAll", this.userService.getAll);
    }
}
module.exports = new UserRouter().router;
//# sourceMappingURL=userRouter.js.map