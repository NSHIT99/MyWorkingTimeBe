import { Types } from "mongoose";
import { IAvatar } from "../interfaces/avatarInterface";
import { Avatar, AvatarSchema } from "../models/avatarModel";
import { BaseRepository } from "./baseRepository";

class avatarRepository extends BaseRepository<IAvatar> {
  constructor() {
    super("Avatar", AvatarSchema);
  }
  public async createAvatar(
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    destination: string,
    filename: string,
    path: string,
    size: number
  ) {
    const newAvatar: IAvatar = new Avatar({
      _id: Types.ObjectId(),
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
      await newAvatar.save();
    } catch (error) {
      throw error;
    }
  }
}
export = new avatarRepository();
