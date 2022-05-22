import { IComment, ICommentGet } from "../../interfaces/commentInterface";
import { IResponse } from "../../interfaces/responseInterface";

type Comment = Omit<IComment, "name">;
export interface CreateCommentResDTO extends IResponse {
  result: Comment | string;
}

export default interface GetCommentResDTO extends IResponse {
  result: ICommentGet[] | string | ICommentGet;
}

