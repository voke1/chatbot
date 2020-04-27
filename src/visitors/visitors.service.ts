import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { Visitors } from './interfaces/visitors.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ResponseService } from '../services/ResponseHandler/response-handler.service';
import * as bcrypt from 'bcrypt';
import { tsThisType } from '@babel/types';

@Injectable()
export class VisitorsService {
  protected BASE_URL = process.env.BASE_URL;

  constructor(
    @InjectModel('Visitors') private visitorsModel: Model<Visitors>,
    private responseService: ResponseService,
  ) {}

  async createVisitors(
    visits: any,
    req,
    res,
  ): Promise<Visitors> {
    const newVisitors = new this.visitorsModel({
      visitors: visits["visitors"],
      botId: visits["botId"]
    });

    try {
      const visitors = await newVisitors.save();
      console.log("visitorss", visitors)

      if (visitors) {
        return this.responseService.requestSuccessful(res, {
          success: true,
          message: 'Visit recorded successfully',
          data: visitors,
        });
      }
      return this.responseService.clientError(res, {
        success: false,
        message: 'There was a problem saving this record. Please try again',
      });
    } catch (e) {
      return this.responseService.serverError(res, e.message);
    }
  }


  async findVisitorsByRange(dates: string, botId: string): Promise<Visitors> {
    const dateRange = dates.split("*")
    console.log("botId", botId)
    return await this.visitorsModel.find({
      botId,
      created_at: {
          $gte: dateRange[0],
          $lt: dateRange[1]
      }
  }).limit(dateRange[2]? parseInt(dateRange[2], 10): null);
  }

  async findAllVisitors(limit: string, botId): Promise<Visitors[]> {
    return await this.visitorsModel.find({botId}).limit(parseInt(limit, 10));
  }
  async findAll(botId): Promise<Visitors[]> {
    console.log(botId)
    return await this.visitorsModel.find({botId});
  }
}
