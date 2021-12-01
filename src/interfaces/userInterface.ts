import { Document } from "mongoose";
import { Branch, Sex, UserType } from "../type/userType";
import { IBase } from "./baseInterface";

export interface IUser extends IBase, Document {
    id: number;
    userName: string;
    password: string;
    emailAddress: string;
    name: string;
    surname: string;
    fullName: string;
    address: string;
    phoneNumber: string;
    roleNames: string[];
    avatarPath: string;
    type: UserType;
    branch: Branch;
    sex: Sex;
} 