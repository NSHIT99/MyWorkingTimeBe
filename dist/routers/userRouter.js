"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Authen_1 = require("../middleware/Authen");
const uploadFile_1 = require("../middleware/uploadFile");
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
        this.router.post("/CreateUser", Authen_1.authen, this.userService.createUser);
        this.router.put("/UpdateUser", Authen_1.authen, this.userService.updateUser);
        this.router.delete("/DeleteUser", Authen_1.authen, this.userService.deleteUser);
        this.router.get("/GetAllPagging", Authen_1.authen, this.userService.getAllPagging);
        this.router.get("/GetAll", Authen_1.authen, this.userService.getAll);
        this.router.post("/createAvatar", uploadFile_1.mp3.single("File"), this.userService.createAvatar);
        this.router.post("/UpdateAvatar", Authen_1.authen, this.userService.updateAvatar);
        this.router.post("/ResetPassword", Authen_1.authen, this.userService.resetPassword);
        this.router.get("/GetUserNotPagging", Authen_1.authen, this.userService.getUserNotPagging);
    }
}
module.exports = new UserRouter().router;
//# sourceMappingURL=userRouter.js.map