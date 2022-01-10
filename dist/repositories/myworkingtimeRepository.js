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
const myworkingtimeModel_1 = require("../models/myworkingtimeModel");
const BaseRepository_1 = require("./BaseRepository");
class MyworkingtimeRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super("Myworkingtime", myworkingtimeModel_1.MyworkingtimeSchema);
    }
    createMyworkingtime(myworkingtime) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = (yield this.lastId()) + 1;
            let newMyworkingtime = new myworkingtimeModel_1.Myworkingtime(Object.assign(Object.assign({ _id: mongoose_1.Types.ObjectId() }, myworkingtime), { status: 0, id }));
            try {
                yield newMyworkingtime.save();
                return this.findById(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteMyworkingtime(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const myworkingtime = yield myworkingtimeModel_1.Myworkingtime.findOne({
                id: id,
            });
            try {
                return yield myworkingtime.remove();
            }
            catch (error) {
                throw error;
            }
        });
    }
    ApproveMyworkingtimes(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield myworkingtimeModel_1.Myworkingtime.updateOne({ id }, { status: 2 });
                return yield this.findById(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    RejectMyworkingtimes(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield myworkingtimeModel_1.Myworkingtime.updateOne({ id }, { status: 3 });
                return yield this.findById(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAllMyworkingtime(startDate, endDate, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let getAllMyworkingtime = yield myworkingtimeModel_1.Myworkingtime.find({
                    $and: [{ dateAt: { $gte: startDate } }, { dateAt: { $lte: endDate } }],
                    status,
                });
                return getAllMyworkingtime;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getMyworkingtimeOfUser(startDate, endDate, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let timesheet = yield myworkingtimeModel_1.Myworkingtime.find({
                    $and: [{ dateAt: { $gte: startDate } }, { dateAt: { $lte: endDate } }],
                });
                return timesheet;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
module.exports = new MyworkingtimeRepository();
//# sourceMappingURL=myworkingtimeRepository.js.map