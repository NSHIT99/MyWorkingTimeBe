import { IService } from "../interfaces/ServiceInterface";
import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import get from "../middleware/get";
import ProjectRepository from "../repositories/ProjectRepository";
import ProjectTaskRepository from "../repositories/ProjectTaskRepository";
import taskRepository from "../repositories/taskRepository";
import userRepository from "../repositories/userRepository";
import myworkingtimeRepository from "../repositories/myworkingtimeRepository";
import { MyworkingtimeDTO } from "../dto/request/myworkingtimeReq";
import { getMyworkingtimeResDTO } from "../dto/response/myworkingtimeResponseDto";
import { IResponse } from "../interfaces/responseInterface";
import { getAllMyworkingtimeOfUser } from "../dto/response/getAll/getAllMyworkingtimeOfUser";
import {
  approveMyworkingtimeResDTO,
  rejectMyworkingtimeResDTO,
} from "../dto/response/approveMyworkingtimeResDto";
import { Branch, UserType } from "../type/userType";
import { GetProjectsIncludingTasks } from "../dto/response/getAll/GetProjectsIncludingTasks";
import projectUserRepository from "../repositories/projectUserRepository";
import jwt_decode from "jwt-decode";

class MyworkingtimeService implements IService {
  defaultMethod(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ) {
    throw new Error("Method not implemented.");
  }
  private myworkingtimeRepository = myworkingtimeRepository;
  private projectRepository = ProjectRepository;
  private projectTaskRepository = ProjectTaskRepository;
  private projectUserRepository = projectUserRepository;
  private taskRepository = taskRepository;
  private userRepository = userRepository;
  default = (req: Request, res: Response, next: NextFunction) => {};

  create = async (req: Request, res: Response, next: NextFunction) => {
    let myworkingtime: MyworkingtimeDTO = req.body;
    let response: getMyworkingtimeResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthRequest: false,
      __abp: true,
    };
    try {
      const decoded: any = jwt_decode(req.headers.authorization.split(" ")[1]);
      const userId: number = decoded.id;
      if (myworkingtime.workingTime <= 8) {
        let newMyworkingtime =
          await this.myworkingtimeRepository.createMyworkingtime(
            myworkingtime,
            userId
          );
        newMyworkingtime = get(newMyworkingtime, [
          "projectTaskId",
          "note",
          "workingTime",
          "status",
          "typeOfWork",
          "dateAt",
          "id",
          "userId",
        ]);
        response = {
          ...response,
          result: {
            ...newMyworkingtime,
          },
          success: true,
        };
        res.status(200).json(response);
      } else {
        response = {
          ...response,
          error: {
            code: 0,
            message: `total normal working time on ${myworkingtime.dateAt} can't  > 8 hours`,
            details: null,
            validationErrors: null,
          },
        };
        res.status(200).json(response);
      }
    } catch (error) {
      throw error;
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const myworkingtime: MyworkingtimeDTO = req.body;
    let response: getMyworkingtimeResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthRequest: false,
      __abp: true,
    };
    try {
      if (myworkingtime.workingTime <= 8) {
        await this.myworkingtimeRepository.findById(myworkingtime.id);
        let editMyworkingtime = await this.myworkingtimeRepository.update(
          myworkingtime
        );
        editMyworkingtime = get(editMyworkingtime, [
          "projectTaskId",
          "note",
          "workingTime",
          "status",
          "typeOfWork",
          "dateAt",
          "id",
        ]);
        response = {
          ...response,
          result: editMyworkingtime,
          success: true,
        };
        res.status(200).json(response);
      } else {
        response = {
          ...response,
          error: {
            code: 0,
            message: `total normal working time on ${myworkingtime.dateAt} can't  > 8 hours`,
            details: null,
            validationErrors: null,
          },
        };
        res.status(500).json(response);
      }
    } catch (error) {
      throw error;
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.query.id as string;
    let response: IResponse = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthRequest: false,
      __abp: true,
    };
    try {
      if (await this.myworkingtimeRepository.findById(parseInt(id))) {
        await this.myworkingtimeRepository.deleteMyworkingtime(parseInt(id));
        response = {
          ...response,
          result: "delete myworkingtime successfully",
          success: true,
        };
        res.status(200).json(response);
      } else {
        response = {
          ...response,
          error: {
            code: 0,
            message: `Not found ${id}!`,
            details: null,
            validationErrors: null,
          },
        };
        res.status(500).json(response);
      }
    } catch (error) {
      next(error);
    }
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.query.id as string;
    let response: getMyworkingtimeResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthRequest: false,
      __abp: true,
    };
    try {
      let myworkingtime = await this.myworkingtimeRepository.findById(
        parseInt(id)
      );
      myworkingtime = get(myworkingtime, [
        "projectTaskId",
        "note",
        "workingTime",
        "typeOfWork",
        "dateAt",
        "status",
        "id",
      ]);
      response = {
        ...response,
        result: myworkingtime,
        success: true,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  submitToPending = async (req: Request, res: Response, next: NextFunction) => {
    let { startDate, endDate } = req.body;
    let response: IResponse = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthRequest: false,
      __abp: true,
    };
    try {
      const decoded: any = jwt_decode(req.headers.authorization.split(" ")[1]);
      const userId: number = decoded.id;
      let countMyworkingtime = 0;
      let myworkingtime =
        await this.myworkingtimeRepository.getMyworkingtimeOfUser(
          startDate,
          endDate,
          userId
        );
      for (let item of myworkingtime) {
        if (item.status == 0) {
          countMyworkingtime++;
          item.status = 1;
          await this.myworkingtimeRepository.update(item);
        }
      }
      response = {
        ...response,
        success: true,
        result: `Submit success ${countMyworkingtime} timesheets`,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  saveandreset = async (req: Request, res: Response, next: NextFunction) => {
    const myworkingtime: MyworkingtimeDTO = req.body;
    let response: getMyworkingtimeResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthRequest: false,
      __abp: true,
    };
    try {
      if (myworkingtime.workingTime <= 8 && myworkingtime.status == 3) {
        await this.myworkingtimeRepository.findById(myworkingtime.id);
        myworkingtime.status = 2;
        let SaveAndReset = await this.myworkingtimeRepository.SaveAndUpdate(
          myworkingtime
        );
        SaveAndReset = get(SaveAndReset, [
          "projectTaskId",
          "note",
          "workingTime",
          "status",
          "targetUserWorkingTime",
          "typeOfWork",
          "isCharged",
          "dateAt",
          "projectTargetUserId",
          "id",
        ]);
        response = {
          ...response,
          result: {
            ...SaveAndReset,
          },
          success: true,
        };
        res.status(200).json(response);
      } else {
        response = {
          ...response,
          error: {
            code: 0,
            message: `total normal working time on ${myworkingtime.dateAt} can't  > 8 hours`,
            details: null,
            validationErrors: null,
          },
        };
      }
      res.status(500).json(response);
    } catch (error) {
      throw error;
    }
  };

  getWorkingtimeOfUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let { startDate, endDate } = req.query;
    let response: getAllMyworkingtimeOfUser = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthRequest: false,
      __abp: true,
    };
    try {
      const decoded: any = jwt_decode(req.headers.authorization.split(" ")[1]);
      const userId: number = decoded.id;
      let workingtimes =
        await this.myworkingtimeRepository.getMyworkingtimeOfUser(
          startDate.toString(),
          endDate.toString(),
          Number(userId)
        );
      let result = [];

      for (let workingtime of workingtimes) {
        workingtime = get(workingtime, [
          "id",
          "projectTaskId",
          "dateAt",
          "workingTime",
          "status",
          "note",
          "typeOfWork",
          "isCharged",
          "billable",
        ]);
        let projectTask = await this.projectTaskRepository.findById(
          workingtime.projectTaskId
        );
        let project = await this.projectRepository.findById(
          projectTask.projectId
        );
        let task = await this.taskRepository.findById(projectTask.taskId);
        let getall = {
          working: workingtimes,
          projectName: project.name,
          taskName: task.name,
          projectCode: project.code,
          billable: projectTask.billable,
        };
        result.push(getall);
      }
      response = {
        ...response,
        result: result,
        success: true,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  approveWorkingtime = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let { idApprove } = req.body;
    let response: approveMyworkingtimeResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthRequest: false,
      __abp: true,
    };
    try {
      let failedcount = 0;
      let successcount = 0;
      let lockdate = new Date().toLocaleDateString();
      for (let id of idApprove) {
        if (await this.myworkingtimeRepository.findById(id)) {
          await this.myworkingtimeRepository.ApproveMyworkingtimes(id);
          successcount++;
        } else failedcount++;
      }
      response = {
        ...response,
        result: {
          success: ` - Success ${successcount} workingtimes.`,
          successCount: successcount,
          failedCount: failedcount,
          fail: ` - Fail ${failedcount} workingtimes.`,
          lockDate: ` - Locked date: ${lockdate}.`,
        },
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  rejectWorkingtime = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let { idReject } = req.body;
    let response: rejectMyworkingtimeResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthRequest: false,
      __abp: true,
    };
    try {
      let failedcount = 0;
      let successcount = 0;
      let lockdate = new Date().toLocaleDateString();
      for (let id of idReject) {
        if (await this.myworkingtimeRepository.findById(id)) {
          await this.myworkingtimeRepository.RejectMyworkingtimes(id);
          successcount++;
        } else failedcount++;
      }
      response = {
        ...response,
        result: {
          fail: ` - Fail ${failedcount} workingtimes.`,
          lockDate: ` - Locked date: ${lockdate}.`,
          success: ` - Success ${successcount} workingtimes.`,
        },
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    let { startDate, endDate, status } = req.query;
    let response: getAllMyworkingtimeOfUser = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthRequest: false,
      __abp: true,
    };

    try {
      let myworkingtime =
        await this.myworkingtimeRepository.getAllMyworkingtime(
          startDate.toString(),
          endDate.toString(),
          Number(status)
        );

      let result = [];
      for (let item of myworkingtime) {
        let user = await this.userRepository.findById(item.userId);
        let myworkingtimes = get(item, [
          "id",
          "dateAt",
          "workingTime",
          "status",
          "typeOfWork",
          "userId",
        ]);
        let projectTask = await this.projectTaskRepository.findById(
          item.projectTaskId
        );
        let project = await this.projectRepository.findById(
          projectTask.projectId
        );
        let task = await this.taskRepository.findById(projectTask.taskId);
        let pms = await this.userRepository.getManageProject(project.id);

        result.push({
          branch: user.branch,
          branchName: Branch[user.branch],
          ...myworkingtimes,
          isUserInProject: true,
          listPM: pms,
          mytimesheetNote: item.note,
          projectCode: project.code,
          project: project.id,
          projectName: project.name,
          taskId: task.id,
          task: task.name,
          type: UserType[user.type],
          avatarPath: user.avatarPath,
          user: user.name,
        });
      }
      response = {
        ...response,
        success: true,
        result: result,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  getProjectsInTasks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const decoded: any = jwt_decode(req.headers.authorization.split(" ")[1]);
    const userId: number = decoded.id;
    let response: GetProjectsIncludingTasks = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthRequest: false,
      __abp: true,
    };
    try {
      let result = [];
      let projectUser = await this.projectUserRepository.findByUserId(+userId);
      await Promise.all(
        projectUser.map(async (item) => {
          let project = await this.projectRepository.findById(item.projectId);

          let projectTask = await this.projectTaskRepository.findByProjectId(
            item.projectId
          );
          let pms = await this.userRepository.getManageProject(project.id);

          let tasks = [];
          await Promise.all(
            projectTask.map(async (item) => {
              let task = await this.taskRepository.findById(item.taskId);
              if (task)
                tasks.push({
                  projectTaskId: task.id,
                  taskName: task.name,
                });
            })
          );
          result.push({
            projectName: project.name,
            projectCode: project.code,
            listPM: pms,
            tasks: tasks,
          });
          return result;
        })
      );
      response = {
        ...response,
        success: true,
        result: result,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export = new MyworkingtimeService();
