import { model, Model, Schema, Types } from "mongoose";
import { IComment } from "../interfaces/commentInterface";

export interface ICommentModel extends Model<IComment> {}

export const CommentSchema: Schema = new Schema(
  {
    id: { type: Number, require: true, unique: true },
    idWorkingtime: { type: Number, require: true, unique: true },
    title: { type: String, require: true, unique: true },
    userId: { type: Number, require: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export const Comment: ICommentModel = model<IComment, ICommentModel>(
  "Comment",
  CommentSchema,
  "comments"
);
