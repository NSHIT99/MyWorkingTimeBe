import { Document } from "mongoose";
import { IBase } from "./baseInterface";

export interface IAvatar extends IBase, Document {
  id: number;
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
