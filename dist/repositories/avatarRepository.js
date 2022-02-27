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
const avatarModel_1 = require("../models/avatarModel");
const baseRepository_1 = require("./baseRepository");
class avatarRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super("Avatar", avatarModel_1.AvatarSchema);
    }
    createAvatar(fieldname, originalname, encoding, mimetype, destination, filename, path, size) {
        return __awaiter(this, void 0, void 0, function* () {
            const newAvatar = new avatarModel_1.Avatar({
                _id: mongoose_1.Types.ObjectId(),
                fieldname,
                originalname,
                encoding,
                mimetype,
                destination,
                filename,
                path,
                size,
            });
            try {
                yield newAvatar.save();
            }
            catch (error) {
                throw error;
            }
        });
    }
}
module.exports = new avatarRepository();
//# sourceMappingURL=avatarRepository.js.map