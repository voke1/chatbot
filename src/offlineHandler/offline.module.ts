import { Module } from '@nestjs/common';



import { OfflineController } from './offline.controller';
import { OfflineService } from './offline.service';
import { SendGridModule } from '@anchan828/nest-sendgrid';
import { EmailService } from '../services/Email/email.service';
import { ResponseService } from '../services/ResponseHandler/response-handler.service';


@Module({
  imports: [
    SendGridModule.forRoot({
      apikey: process.env.SENDGRID_API_KEY,
    }),
  ],
  controllers: [OfflineController],
  providers: [EmailService, OfflineService, ResponseService],
  exports: [OfflineService],
})

export class OfflineModule { }
