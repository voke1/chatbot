import {
  Controller,
  Post,
  Put,
  Delete,
  Param,
  Patch,
  Get,
  Body,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { TrainingService } from './training.service';
import { Training } from './interfaces/training.interface';
import { CreateTrainingDto } from './dto/create-training-dto';

@Controller('training')
export class TrainingController {
  constructor(private trainingService: TrainingService) {}
  @Post()
  async createTrainingData(
    @Body() CreateTrainingDto: CreateTrainingDto,
    @Req() res: Response,
    @Res() req: Request,
  ): Promise<Training> {
    return this.trainingService.createTrainingData(CreateTrainingDto, res, req);
  }
  @Get(':botId')
  findTrainingDataByBot(@Param('botId') botId): Promise<Training> {
    return this.trainingService.findTrainingDataByBot(botId);
  }
  @Get()
  async findAllTrainingData(): Promise<Training[]> {
    return this.trainingService.findAllTrainingData();
  }
  @Patch(':id')
  async updateTraining(
    @Param('id') id,
    @Req() req: Request,
    @Res() res: Response,
    @Body() trainingDto: CreateTrainingDto
  ): Promise<Training[]> {
    return this.trainingService.updateTrainingData(id,trainingDto, req, res);
  }
}
