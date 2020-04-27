import { Injectable } from '@nestjs/common';
import { Payment } from './interfaces/payment.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ResponseService } from '../services/ResponseHandler/response-handler.service';
import * as bcrypt from 'bcrypt';
import { tsThisType } from '@babel/types';

@Injectable()
export class PaymentService {
  protected BASE_URL = process.env.BASE_URL;

  constructor(
    @InjectModel('Payment') private paymentModel: Model<Payment>,
    private responseService: ResponseService,
  ) {}

  async createPayment(payment: Payment) {
    console.log(payment)
    const newPayment = new this.paymentModel(payment);

    try {
      const Pays = await newPayment.save();
      if (Pays) {
        return  {
          success: true,
          message: 'Payment has been successfully saved',
          Pays
        };
      }
      return  {
        success: false,
        message: 'payment not saved. Please try again',
      };
    } catch (e) {
      return (e.message);
    }
  }
  async getPayments(botId): Promise<Payment[]> {
    if(botId){
      console.log("i am called payment")
      return await this.paymentModel.find({botId: botId});

    }
    return await this.paymentModel.find();
  }
  async delete(id: string): Promise<Payment> {
    return await this.paymentModel.findByIdAndRemove(id);
  }
  
}
