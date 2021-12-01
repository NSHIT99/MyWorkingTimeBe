"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mongoose_1 = require("mongoose");
const userModel_1 = require("../models/userModel");
const baseRepository_1 = require("./baseRepository");
class UserRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super("User", userModel_1.UserSchema);
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (yield this.lastId()) + 1;
            const newUser = new userModel_1.User(Object.assign(Object.assign({ _id: mongoose_1.Types.ObjectId() }, user), { avatarPath: "", id, fullName: `${user.surname} ${user.name}` }));
            try {
                return yield newUser.save();
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userModel_1.User.findOne({
                id: id,
            });
            try {
                return yield user.remove();
            }
            catch (error) {
                throw error;
            }
        });
    }
    findAllPaging(filterItems, skip, max, search) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let name = new RegExp(search, "i");
                let user = yield userModel_1.User.find({ name })
                    .select("userName emailAddress name surname fullName address phoneNumber roleNames avatarPath type branch sex")
                    .skip(skip)
                    .limit(max);
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
module.exports = new UserRepository();
//# sourceMappingURL=userRepository.js.map