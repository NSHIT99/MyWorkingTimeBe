import { IResponse } from "../../interfaces/responseInterface";

export interface approveMyworkingtimeResDTO extends IResponse {
  result: {
    fail: string;
    failedCount: number;
    lockDate: string;
    success: string;
    successCount: number;
  };
}

export interface rejectMyworkingtimeResDTO extends IResponse {
  result: {
    fail: string;
    lockDate: string;
    success: string;
  };
}
