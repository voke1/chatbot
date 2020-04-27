import { Module } from '@nestjs/common';





import { ClientSchema } from './schemas/client.schema';


import { ClientController } from './client.controller';
import { ClientsService } from './client.service';
import { MongooseModule } from '@nestjs/mongoose';
import { clientsSchemas } from './schemas/client.schema';
import { SendGridModule } from '@anchan828/nest-sendgrid';
import { EmailService } from '../services/Email/email.service';
import { ResponseService } from '../services/ResponseHandler/response-handler.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Client', schema: clientsSchemas }]),
    SendGridModule.forRoot({
      apikey: process.env.SENDGRID_API_KEY,
    }),
  ],
  controllers: [ClientController],
  providers: [EmailService, ClientsService, ResponseService],
  exports: [ClientsService],
})

export class ClientsModule { }
