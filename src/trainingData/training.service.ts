import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { Training } from './interfaces/training.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ResponseService } from '../services/ResponseHandler/response-handler.service';

@Injectable()
export class TrainingService {
  protected BASE_URL = process.env.BASE_URL;

  constructor(
    @InjectModel('Training') private trainingModel: Model<Training>,
    private responseService: ResponseService,
  ) {}

  async createTrainingData(training: any, req, res): Promise<Training> {
    const newData = new this.trainingModel({
      trainingData: training['trainingData'],
      learnedDta: training['learnedData'],

      botId: training['botId'],
    });

    try {
      const training = await newData.save();
      console.log('training data', training);

      if (training) {
        return this.responseService.requestSuccessful(res, {
          success: true,
          message: 'Training data created successfully',
          data: training,
        });
      }
      return this.responseService.clientError(res, {
        success: false,
        message: 'There was a problem while creating your training data',
      });
    } catch (e) {
      return this.responseService.serverError(res, e.message);
    }
  }

  async findTrainingDataByBot(botId: string): Promise<Training> {
    console.log('botId', botId);
    return await this.trainingModel.find({
      botId,
    });
  }

  async findAllTrainingData(): Promise<Training[]> {
    return await this.trainingModel.findOne({});
  }

  async updateTrainingData(
    id: string,
    training: Training,
    req,
    res,
  ): Promise<Training[]> {
    try {
      const isFound = await this.trainingModel.findOne({ botId: 'one' });
      if (!isFound) {
        const newData = new this.trainingModel({
          training: training,
          botId: 'one',
        });

        try {
          const training = await newData.save();
          console.log('training data', training);

          if (training) {
            return this.responseService.requestSuccessful(res, {
              success: true,
              message: 'Training data created successfully',
              data: training,
            });
          }
          return this.responseService.clientError(res, {
            success: false,
            message: 'There was a problem while creating your training data',
          });
        } catch (e) {
          return this.responseService.serverError(res, e.message);
        }
        return this.responseService.clientError(
          res,
          'Cannot update empty training data',
        );
      }
      const updatedData = await this.trainingModel.findOneAndUpdate(
        { botId: 'one' },
        { training: training },
        { new: true },
      );
      if (updatedData) {
        return await this.responseService.requestSuccessful(res, {
          success: true,
          message: 'Training data successfully updated',
        });
      }
      return this.responseService.clientError(
        res,
        'An error occured while updating the training data',
      );
    } catch (e) {
      console.log('error', e);
      return this.responseService.serverError(res, e.message);
    }
  }
}
