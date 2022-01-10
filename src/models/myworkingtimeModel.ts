import { model, Model, Schema, Types } from "mongoose";
import { IMyworkingtime } from "../interfaces/myworkingtimeInterface";
import { status, typeOfWork } from "../type/myWorkingtimeType";

export interface IMyworkingtimeModel extends Model<IMyworkingtime> {}

export const MyworkingtimeSchema: Schema = new Schema(
  {
    _id: Types.ObjectId,
    projectTaskId: { type: Number },
    note: { type: String, require: true },
    workingTime: { type: Number, require: true },
    typeOfWork: { type: Number, enum: Object.values(typeOfWork) },
    dateAt: { type: Date },
    status: { type: Number, enum: Object.values(status) },
    id: { type: Number, require: true, unique: true },
    userId: { type: Number },
  },
  {
    timestamps: true,
  }
);

export const Myworkingtime: IMyworkingtimeModel = model<IMyworkingtime, IMyworkingtimeModel>(
  "Myworkingtime",
  MyworkingtimeSchema,
  "myworkingtimes"
);
