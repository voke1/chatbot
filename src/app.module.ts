import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ClientController } from './client/client.controller';
import { ClientsModule } from './client/client.module';
import { ClientsService } from './client/client.service';
import { clientsSchemas } from './client/schemas/client.schema';
import { CompaniesController } from './companies/companies.controller';
import { CompaniesModule } from './companies/companies.module';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { SettingSchema } from './modules/setting/schemas/setting.schema';
import { SettingController } from './modules/setting/setting.controller';
import { SettingsModule } from './modules/setting/setting.module';
import { SettingService } from './modules/setting/setting.service';
import { EmailService } from './services/Email/email.service';
import { QueryService } from './services/query/query.service';
import { ResponseService } from './services/ResponseHandler/response-handler.service';
import { treeSchema } from './tree/schemas/tree.schema';
import { TreeModule } from './tree/tree.module';
import { TreeService } from './tree/tree.service';
import { CompaniesService } from './companies/companies.service';
import { CompaniesSchema } from './companies/companies.schema';
import {PaymentModule} from './payment/payment.module';

import { TemplateModule } from './template/template.module';
import { TemplateService } from './template/template.service';
import { templateSchema } from './template/schemas/template.schema';

import {VisitorsModule} from './visitors/visitors.module'
import {VisitorsService} from './visitors/visitors.service'
import {VisitorsSchema} from './visitors/schemas/visitors.schema'


import {ActiveusersModule} from './activeusers/activeusers.module'
import {ActiveusersService} from './activeusers/activeusers.service'
import {ActiveusersSchema} from './activeusers/schemas/activeusers.schema'

import {TrainingModule} from './trainingData/training.module'
import {TrainingService} from './trainingData/training.service'
import {TrainingController} from './trainingData/training.controller'
import {TrainingSchema} from './trainingData/schemas/training.schema'

import {OfflineModule} from './offlineHandler/offline.module'
import {OfflineService} from './offlineHandler/offline.service'
import {AppGateway} from './app.gateway'
import { PaymentService } from './payment/payment.service';
import { PaymentController } from './payment/payment.controller';
import { paymentSchemas } from './payment/schemas/payment.schema';
 const configuration = () => ({
  port: parseInt(process.env.PORT, 10) || 9000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432
  }
});
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Client', schema: clientsSchemas },
      { name: 'Setting', schema: SettingSchema },
      { name: 'Tree', schema: treeSchema },
      {name: 'Template', schema: templateSchema},
      {name: 'Companies', schema: CompaniesSchema},
      {name: 'Visitors', schema: VisitorsSchema},
      {name: "Activeusers", schema: ActiveusersSchema},
      {name: "Training", schema: TrainingSchema},
      { name: "Payment", schema: paymentSchemas }


    ]),
    ClientsModule,
    TreeModule,
    TemplateModule,
    VisitorsModule,
    ActiveusersModule,
    AuthModule,
    SettingsModule,
    ConversationsModule,
    CompaniesModule,
    PaymentModule,
    OfflineModule,
    TrainingModule,
    ConfigModule.forRoot({isGlobal:true, load:[configuration]}),
    MongooseModule.forRoot(process.env.DB_URL),
  ],
  controllers: [ClientController, SettingController, CompaniesController, TrainingController, PaymentController],
  providers: [
    AppGateway,
    ClientsService,
    TreeService,
    TemplateService,
    VisitorsService,
    ActiveusersService,
    SettingService,
    QueryService,
    EmailService,
    ResponseService,
    CompaniesService,
    OfflineService,
    TrainingService,
    PaymentService
    
  ],
})
export class AppModule { }