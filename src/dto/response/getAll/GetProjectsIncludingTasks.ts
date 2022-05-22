import { IResponse } from "../../../interfaces/responseInterface";

export interface GetProjectsIncludingTasks extends IResponse {
  result: {
    id: number;
    projectName: string;
    projectCode: string;
    listPM: string[];
    tasks: {
      confirm: boolean;
      projectTaskId: number;
      taskName: string;
    }[];
  }[];
}
