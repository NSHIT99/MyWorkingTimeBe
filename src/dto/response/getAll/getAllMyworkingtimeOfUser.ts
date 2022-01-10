import { IResponse } from "../../../interfaces/responseInterface";

export interface getAllMyworkingtimeOfUser extends IResponse {
  result: {
    id: number;
    projectName: string;
    taskName: string;
    projectTaskId: number;
    customerName: string;
    projectCode: string;
    dateAt: Date;
    workingTime: number;
    status: number;
    note: string;
    typeOfWork: number;
    billable: boolean;
  }[];
}
