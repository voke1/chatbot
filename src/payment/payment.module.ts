import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { paymentSchemas } from './schemas/payment.schema';
import { ResponseService } from '../services/ResponseHandler/response-handler.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Payment', schema: paymentSchemas }])],
  controllers: [PaymentController],
  providers: [PaymentService, ResponseService],
})
export class PaymentModule {}
