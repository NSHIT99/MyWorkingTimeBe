import { IResponse } from "../../interfaces/responseInterface";
import { status, typeOfWork } from "../../type/myWorkingtimeType";

export interface getMyworkingtimeResDTO extends IResponse {
  result: {
    projectTaskId: number;
    note: string;
    workingTime: number;
    typeOfWork: typeOfWork;
    dateAt: string;
    status: status;
    id: number;
    userId: number;
  };
}
