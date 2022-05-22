"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Authen_1 = require("../middleware/Authen");
const roleService_1 = __importDefault(require("../services/roleService"));
const baseRouter_1 = require("./baseRouter");
/**
 * @description RoleRouter
 */
class RoleRouter extends baseRouter_1.BaseRouter {
    constructor() {
        super();
        this.roleService = roleService_1.default;
        this.init();
    }
    /**
     * Connect routes to their matching controller endpoints.
     */
    init() {
        this.router.post("/Create", Authen_1.authen, this.roleService.create);
        this.router.post("/Update", Authen_1.authen, this.roleService.update);
        this.router.delete("/Delete", Authen_1.authen, this.roleService.delete);
        this.router.get("/GetAll", Authen_1.authen, this.roleService.getAll);
    }
}
module.exports = new RoleRouter().router;
//# sourceMappingURL=roleRouter.js.map