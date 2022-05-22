import { IComment } from "../../../interfaces/commentInterface";
import { IResponse } from "../../../interfaces/responseInterface";

export interface GetAllCommentResDTO extends IResponse{
    result: IComment[];
}