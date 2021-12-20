import { IProjectTask } from "../../interfaces/projectTaskInterface";
import { IProjectUser } from "../../interfaces/projectUserInterface";
import { IResponse } from "../../interfaces/responseInterface";
import { IUser } from "../../interfaces/userInterface";

export default interface GetUserResDTO extends IResponse {
  result: IUser[] | string | IUser;
}

type User = Omit<IUser, 'username'>
export interface UserResDTO extends IResponse{
    result: User | string
}

export interface ProjectTaskResDTO extends IResponse{
  result: IProjectTask;
}

export interface ProjectUserResDTO extends IResponse{
  result: IProjectUser;
}