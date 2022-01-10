import { Document } from "mongoose";
import { status, typeOfWork } from "../type/myWorkingtimeType";
import { IBase } from "./BaseInterface";

export interface IMyworkingtime extends IBase, Document {
  projectTaskId: number;
  note: string;
  workingTime: number;
  typeOfWork: typeOfWork;
  dateAt: string;
  status: status;
  id: number;
  userId: number;
}
