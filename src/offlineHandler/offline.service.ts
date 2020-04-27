import { Injectable } from '@nestjs/common';
import { Offline } from './interfaces/offline.interface';
import { EmailService } from '../services/Email/email.service';
import { ResponseService } from '../services/ResponseHandler/response-handler.service';

@Injectable()
export class OfflineService {
  protected BASE_URL = process.env.BASE_URL;

  constructor(
    private emailService: EmailService,
    private responseService: ResponseService,
  ) { }
  
  async validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  async sendOfflineMessage(payload: Offline, req, res): Promise<Offline> {
    if (!(await this.validateEmail(payload.email))) {
      return this.responseService.clientError(
        res,
        'please enter a valid email',
      );
    }
    try {
      const sentEmail =  this.emailService.sendOfflineMail(payload)
      if (sentEmail) {
        return this.responseService.requestSuccessful(res,{
          success: true,
          message:
            'An email has been sent successfully ',
        })
      }
      
    } catch (e) {
      return this.responseService.serverError(res, e.message);
    }
  }

}

