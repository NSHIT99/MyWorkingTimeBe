import { IResponse } from "../../../interfaces/responseInterface";
import { Branch, UserType } from "../../../type/userType";

interface User {
  id: number;
  fullName: string;
  type: UserType;
  avatarPath: string;
  branch: Branch;
}

export interface GetAllUserNotPaggingResDTO extends IResponse {
  result: User[];
}
