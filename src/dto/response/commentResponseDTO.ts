import { IResponse } from "../../interfaces/responseInterface";

export interface GetCommentResDTO extends IResponse {
  result: {
    id: number;
    idWorkingtime: number;
    title: string;
    userId: number;
  };
}
