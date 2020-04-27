import {
  Controller,
  Post,
  Put,
  Delete,
  Param,
  Patch,
  Get,
  Body,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { VisitorsService } from './visitors.service';
import { Visitors } from './interfaces/visitors.interface';
import { CreateVisitorsDto } from './dto/create-visitors-dto';

@Controller('visitors')
export class VisitorsController {
  constructor(private visitorsService: VisitorsService) {}
  @Post()
  async createVisitors(
    @Body() CreateVisitorsDto: CreateVisitorsDto,
    @Req() res: Response,
    @Res() req: Request,
  ): Promise<Visitors> {
    return this.visitorsService.createVisitors(CreateVisitorsDto, res, req);
  }
  @Get(':date/:botId')
  findVisitorsByRange(@Param('date') date, @Param('botId') botId): Promise<Visitors> {
    console.log("as well")
    return this.visitorsService.findVisitorsByRange(date, botId);
  }
  @Get('all/:limit/:botId')
  async findAllVisitors(@Param('limit') limit, @Param('botId') botId): Promise<Visitors[]> {
    return this.visitorsService.findAllVisitors(limit, botId);
  }
  @Get(":botId")
  async findAll(@Param('botId') botId): Promise<Visitors[]> {
    console.log("calledd")
    return this.visitorsService.findAll(botId);
  }
}
