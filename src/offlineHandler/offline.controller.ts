import {
  Controller,
  Post,
  Body,
  Req,
  Res,

} from '@nestjs/common';
import { OfflineService } from './offline.service';
import { Offline } from './interfaces/offline.interface';

import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
// @Controller('client')

@Controller('offline')
export class OfflineController {
  constructor(private readonly offlineService: OfflineService) { }

  @Post()
  async sendMail(
    @Body() createOfflineDto,
    @Req() res: Response,
    @Res() req: Request,
  ): Promise<Offline> {
    return this.offlineService.sendOfflineMessage(createOfflineDto, res, req);
  }

}
