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
const commentModel_1 = require("../models/commentModel");
const baseRepository_1 = require("./baseRepository");
class CommentRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super("Comment", commentModel_1.CommentSchema);
    }
    createComment(comment, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (yield this.lastId()) + 1;
            const newComment = new commentModel_1.Comment(Object.assign(Object.assign({}, comment), { userId: userId, id }));
            try {
                return yield newComment.save();
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield commentModel_1.Comment.findOne({
                id: id,
            });
            try {
                return yield comment.remove();
            }
            catch (error) {
                throw error;
            }
        });
    }
    findIdWorkingtime(idWorkingtime) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.findByIdWorkingtime(idWorkingtime);
            }
            catch (error) { }
        });
    }
}
module.exports = new CommentRepository();
//# sourceMappingURL=commentRepository.js.map