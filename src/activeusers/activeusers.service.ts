import { Injectable } from '@nestjs/common';
import { Activeusers } from './interfaces/activeusers.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ResponseService } from '../services/ResponseHandler/response-handler.service';
import * as bcrypt from 'bcrypt';
import { tsThisType } from '@babel/types';

@Injectable()
export class ActiveusersService {
  protected BASE_URL = process.env.BASE_URL;

  constructor(
    @InjectModel('Activeusers') private activeusersModel: Model<Activeusers>,
    private responseService: ResponseService,
  ) {}

  async createActiveusers(
    activeusers: Activeusers,
    req,
    res,
  ): Promise<Activeusers> {
    const newActiveuser = new this.activeusersModel({
      activeusers: activeusers,
    });

    try {
      const activeuser = await newActiveuser.save();
      if (activeuser) {
        return this.responseService.requestSuccessful(res, {
          success: true,
          message: 'One active user recorded successfully',
          data: activeuser,
        });
      }
      return this.responseService.clientError(res, {
        success: false,
        message: 'There was a problem recording this user',
      });
    } catch (e) {
      return this.responseService.serverError(res, e.message);
    }
  }



  async findAll(): Promise<Activeusers[]> {
    return await this.activeusersModel.find();
  }
  async delete(id: string): Promise<Activeusers> {
    return await this.activeusersModel.findByIdAndRemove(id);
  }

}
