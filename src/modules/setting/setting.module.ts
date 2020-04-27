import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';
import { SettingSchema } from './schemas/setting.schema';
import { treeSchema } from '../../tree/schemas/tree.schema';
import {ResponseService} from '../../services/ResponseHandler/response-handler.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Setting', schema: SettingSchema },
      { name: 'Tree', schema: treeSchema },
    ]),
  ],
  controllers: [SettingController],
  providers: [SettingService, ResponseService],
})
export class SettingsModule {}
