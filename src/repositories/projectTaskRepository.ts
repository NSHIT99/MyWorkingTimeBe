import { Types } from "mongoose";
import { IProjectTask } from "../interfaces/projectTaskInterface";
import { ProjectTask, ProjectTaskSchema } from "../Models/projectTaskModel";
import { BaseRepository } from "./baseRepository";

class ProjectTaskRepository extends BaseRepository<IProjectTask> {
  constructor() {
    super("ProjectTask", ProjectTaskSchema);
  }
  public async createProjectTask(
    taskId: number,
    projectId: number,
    billable: boolean,
    timeStartTask: Date,
    timeEndTask: Date
  ) {
    const id = (await this.lastId()) + 1;
    const newProjectTask: IProjectTask = new ProjectTask({
      _id: Types.ObjectId(),
      projectId,
      taskId,
      billable,
      id,
      timeStartTask,
      timeEndTask,
    });
    try {
      await newProjectTask.save();
      return this.findById(id);
    } catch (error) {
      throw error;
    }
  }

  public async deleteTaskProject(id: number): Promise<boolean> {
    try {
      await ProjectTask.deleteOne({ id: id });
      return true;
    } catch (error) {
      throw error;
    }
  }

  public async findByProjectId(projectId: number): Promise<IProjectTask[]> {
    try {
      let project = await ProjectTask.find({ projectId });
      return project;
    } catch (error) {
      throw error;
    }
  }

  public async findByIdTask(taskId: number) {
    try {
      await ProjectTask.findById({ taskId });
      return true;
    } catch (error) {
      throw error;
    }
  }

  public async findAndUpdate(taskId: number) {
    try {
      const checkId = await ProjectTask.find({ taskId });
      checkId.map(async (item) => {
        await ProjectTask.findByIdAndUpdate(
          { _id: item._id },
          { confirm: true }
        );
      });
      return true;
    } catch (error) {
      throw error;
    }
  }
}
export = new ProjectTaskRepository();
