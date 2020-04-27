import { Module } from '@nestjs/common';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainingSchema } from './schemas/training.schema';
import { ResponseService } from '../services/ResponseHandler/response-handler.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Training', schema: TrainingSchema }])],
  controllers: [TrainingController],
  providers: [TrainingService, ResponseService],
})
export class TrainingModule {}
