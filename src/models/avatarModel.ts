import { model, Model, Schema, Types } from "mongoose";
import { IAvatar } from "../interfaces/avatarInterface";

export interface IAvatarModel extends Model<IAvatar> {}

export const AvatarSchema: Schema = new Schema(
  {
    id: { type: Number, require: true, unique: true },
    filename: { type: String, require: true, unique: true },
    fieldname: { type: String, require: true, unique: true },
    originalname: { type: String, require: true, unique: true },
    encoding: { type: String, require: true, unique: true },
    mimetype: { type: String, require: true, unique: true },
    destination: { type: String, require: true, unique: true },
    path: { type: String, require: true, unique: true },
    size: { type: Number, require: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export const Avatar: IAvatarModel = model<IAvatar, IAvatarModel>(
  "avatar",
  AvatarSchema,
  "avatars"
);
