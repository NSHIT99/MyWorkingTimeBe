import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { CommentDTO } from "../dto/request/commentReqDTO";
import GetCommentResDTO, {
  CreateCommentResDTO,
} from "../dto/response/createCommentResDTO";
import { GetAllCommentResDTO } from "../dto/response/getAll/getAllCommentResDTO";
import { IResponse } from "../interfaces/responseInterface";
import { IService } from "../interfaces/serviceInterface";
import get from "../middleware/get";
import commentRepository from "../repositories/commentRepository";
import userRepository from "../repositories/userRepository";
import jwt_decode from "jwt-decode";

class CommentService implements IService {
  defaultMethod(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ) {
    throw new Error("Method not implemented.");
  }
  private commentRepository = commentRepository;
  private userRepository = userRepository;
  default = (req: Request, res: Response, next: NextFunction) => {};

  createCommeent = async (req: Request, res: Response, next: NextFunction) => {
    let comment: CommentDTO = req.body;
    let response: CreateCommentResDTO = {
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
      let newComment = await this.commentRepository.createComment(
        comment,
        userId
      );
      newComment = get(newComment, ["id", "idWorkingtime", "title", "userId"]);
      response = {
        ...response,
        result: newComment,
        success: true,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  updateComment = async (req: Request, res: Response, next: NextFunction) => {
    let comment: CommentDTO = req.body;
    let response: CreateCommentResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthRequest: false,
      __abp: true,
    };
    try {
      await this.commentRepository.findById(comment.id);
      let updateComment = await this.commentRepository.update(comment);
      updateComment = get(updateComment, [
        "id",
        "idWorkingtime",
        "title",
        "userId",
      ]);
      response = {
        ...response,
        result: updateComment,
        success: true,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  Delete = async (req: Request, res: Response, next: NextFunction) => {
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
      const deleteComment = await this.commentRepository.delete(parseInt(id));
      response = {
        ...response,
        result: "Delete comment successfully",
        success: true,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    let response: GetAllCommentResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthRequest: false,
      __abp: true,
    };

    try {
      let getComment = await this.commentRepository.findAll();
      response = {
        ...response,
        success: true,
        result: getComment,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    const idWorkingtime = req.query.idWorkingtime as string;
    let response: GetCommentResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthRequest: false,
      __abp: true,
    };
    try {
      let result = [];
      let comment = await this.commentRepository.findIdWorkingtime(
        parseInt(idWorkingtime)
      );

      const user = await this.userRepository.findById(comment.userId);
      comment = get(comment, ["id", "idWorkingtime", "title", "userId"]);
      result.push({ ...comment, username: user.fullName });
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
export = new CommentService();
