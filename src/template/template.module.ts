import { Module } from '@nestjs/common';
import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';
import { MongooseModule } from '@nestjs/mongoose';
import { templateSchema } from './schemas/template.schema';
import { ResponseService } from '../services/ResponseHandler/response-handler.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Template', schema: templateSchema }])],
  controllers: [TemplateController],
  providers: [TemplateService, ResponseService],
})
export class TemplateModule {}
