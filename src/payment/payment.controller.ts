import {
  Controller,
  Post,
  Put,
  Delete,
  Param,
  Patch,
  Get,
  Body,
  Query,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { PaymentService } from './payment.service';
import { Payment } from './interfaces/payment.interface';
import { CreatePaymentDto } from './dto/create-payment-dto';
@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}
  @Post()
  createPayment(
    @Body() createPaymentDto: CreatePaymentDto,
  
  ): Promise<Payment> {
    return this.paymentService.createPayment(createPaymentDto);  }

  @Get()
   findPayments(@Query('botId') botId): Promise<Payment[]> {
    return this.paymentService.getPayments(botId);
  }
  @Delete(':id')
  delete(@Param('id') id): Promise<Payment> {
    return this.paymentService.delete(id);
  }
  
}
