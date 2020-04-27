import { Module } from '@nestjs/common';
import { VisitorsController } from './visitors.controller';
import { VisitorsService } from './visitors.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VisitorsSchema } from './schemas/visitors.schema';
import { ResponseService } from '../services/ResponseHandler/response-handler.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Visitors', schema: VisitorsSchema }])],
  controllers: [VisitorsController],
  providers: [VisitorsService, ResponseService],
})
export class VisitorsModule {}
