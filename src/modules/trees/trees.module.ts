import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TreesController } from './trees/trees.controller';
import { TreesService } from './trees/trees.service';
import {TreeSchema} from "./tree.schema";


const treeObject = {name:'tree', schema:TreeSchema};

@Module({
    imports: [MongooseModule.forFeature([treeObject])],
  controllers: [TreesController],
  providers: [TreesService]
})
export class TreesModule {}
