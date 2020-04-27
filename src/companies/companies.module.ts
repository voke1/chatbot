import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { CompaniesSchema} from "./companies.schema";
import { MongooseModule } from '@nestjs/mongoose';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Companies', schema: CompaniesSchema }]),

    ],
    controllers: [CompaniesController],
    providers: [CompaniesService],
    exports: [CompaniesService],
})
export class CompaniesModule {
   
}
