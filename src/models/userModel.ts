import { Model, model, Schema } from "mongoose";
import { IUser } from "../interfaces/userInterface";
import { isEmail } from "validator";
import { Branch, Sex, UserType } from "../type/userType";

export const UserSchema: Schema = new Schema(
  {
    id: { type: Number, require: true, unique: true },
    userName: {
      type: String,
      require: [true, "The UserName field is required"],
      unique: true,
    },
    password: {
      type: String,
      requied: [true, "The PassWord field is required"],
      minlength: [6, "password can't be shorter than 6 characters"],
    },
    emailAddress: {
      type: String,
      required: "Email address is required",
      validate: [isEmail, "Please fill a valid email address"],
    },
    name: { type: String, require: [true, "The Name field is required"] },
    surname: { type: String, require: [true, "The SurName field is required"] },
    fullName: { type: String, require: true },
    address: { type: String, default: null },
    phoneNumber: { type: String, default: null },
    roleNames: [String],
    avatarPath: { type: String, default: null },
    type: { type: UserType, enum: Object.values(UserType) },
    branch: { type: Branch, enum: Object.values(Branch) },
    sex: { type: Sex, enum: Object.values(Sex) },
  },
  {
    timestamps: true,
  }
);

export interface IUserModel extends Model<IUser> {}

export const User: IUserModel = model<IUser, IUserModel>(
  "User",
  UserSchema,
  "users"
);

UserSchema.path("userName").validate(async (value) => {
  const count = await User.count({ userName: value });
  return !count;
}, "userName already exists");
