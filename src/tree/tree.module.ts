import { Module } from '@nestjs/common';
import { TreeController } from './tree.controller';
import { TreeService } from './tree.service';
import { MongooseModule } from '@nestjs/mongoose';
import { treeSchema } from './schemas/tree.schema';
import { ResponseService } from '../services/ResponseHandler/response-handler.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Tree', schema: treeSchema }])],
  controllers: [TreeController],
  providers: [TreeService, ResponseService],
})
export class TreeModule {}
