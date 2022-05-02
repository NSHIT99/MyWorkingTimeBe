import { Types } from "mongoose";
import { IMyworkingtime } from "../interfaces/myworkingtimeInterface";
import {
  Myworkingtime,
  MyworkingtimeSchema,
} from "../models/myworkingtimeModel";
import { BaseRepository } from "./BaseRepository";

class MyworkingtimeRepository extends BaseRepository<IMyworkingtime> {
  constructor() {
    super("Myworkingtime", MyworkingtimeSchema);
  }

  public async createMyworkingtime(
    myworkingtime: IMyworkingtime
  ): Promise<IMyworkingtime> {
    let id = (await this.lastId()) + 1;
    let newMyworkingtime: IMyworkingtime = new Myworkingtime({
      _id: Types.ObjectId(),
      ...myworkingtime,
      status: 0,
      id,
    });
    try {
      await newMyworkingtime.save();
      return this.findById(id);
    } catch (error) {
      throw error;
    }
  }

  public async deleteMyworkingtime(id: number) {
    const myworkingtime = await Myworkingtime.findOne({
      id: id,
    });
    try {
      return await myworkingtime.remove();
    } catch (error) {
      throw error;
    }
  }

  public async ApproveMyworkingtimes(id: number) {
    try {
      await Myworkingtime.updateOne({ id }, { status: 2 });
      return await this.findById(id);
    } catch (error) {
      throw error;
    }
  }

  public async RejectMyworkingtimes(id: number) {
    try {
      await Myworkingtime.updateOne({ id }, { status: 3 });
      return await this.findById(id);
    } catch (error) {
      throw error;
    }
  }

  public async getAllMyworkingtime(
    startDate: string,
    endDate: string,
    status: number
  ) {
    try {
      let getAllMyworkingtime = await Myworkingtime.find({
        $and: [
          { createdAt: { $gte: startDate } },
          { createdAt: { $lte: endDate } },
        ],
        status,
      });
      return getAllMyworkingtime;
    } catch (error) {
      throw error;
    }
  }

  public async getMyworkingtimeOfUser(
    startDate: string,
    endDate: string,
    userId: number
  ): Promise<IMyworkingtime[]> {
    try {
      let timesheet = await Myworkingtime.find({
        $and: [
          { createdAt: { $gte: startDate } },
          { createdAt: { $lte: endDate } },
        ],
      });
      return timesheet;
    } catch (error) {
      throw error;
    }
  }
}

export = new MyworkingtimeRepository();
