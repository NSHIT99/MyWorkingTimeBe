import { Document } from "mongoose";
import { IBase } from "./baseInterface";

export interface IComment extends IBase, Document {
  id: number;
  idWorkingtime: number;
  title: string;
  userId: number;
}

export interface ICommentGet extends IBase, Document {
  id: number;
  idWorkingtime: number;
  title: string;
  username: string;
  userId: number;
}
