import { Types } from "mongoose";
import { IComment } from "../interfaces/commentInterface";
import { Comment, CommentSchema } from "../models/commentModel";
import { BaseRepository } from "./baseRepository";

class CommentRepository extends BaseRepository<IComment> {
  constructor() {
    super("Comment", CommentSchema);
  }

  public async createComment(comment: IComment, userId: any) {
    const id = (await this.lastId()) + 1;
    const newComment: IComment = new Comment({
      ...comment,
      userId: userId,
      id,
    });

    try {
      return await newComment.save();
    } catch (error) {
      throw error;
    }
  }

  public async deleteTask(id: number) {
    const comment = await Comment.findOne({
      id: id,
    });

    try {
      return await comment.remove();
    } catch (error) {
      throw error;
    }
  }

  public async findIdWorkingtime(idWorkingtime: number) {
    try {
      return await this.findByIdWorkingtime(idWorkingtime);
    } catch (error) {}
  }
}
export = new CommentRepository();
