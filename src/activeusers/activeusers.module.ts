import { Module } from '@nestjs/common';
import { ActiveusersController } from './activeusers.controller';
import { ActiveusersService } from './activeusers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ActiveusersSchema } from './schemas/activeusers.schema';
import { ResponseService } from '../services/ResponseHandler/response-handler.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Activeusers', schema: ActiveusersSchema }])],
  controllers: [ActiveusersController],
  providers: [ActiveusersService, ResponseService],
})
export class ActiveusersModule {}
