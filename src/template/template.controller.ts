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
import { TemplateService } from './template.service';
import { Template } from './interfaces/template.interface';
import { CreateTemplateDto } from './dto/create-template-dto';

@Controller('template')
export class TemplateController {
  constructor(private templateService: TemplateService) {}
  @Post()
  async createTemplate(
    @Body() CreateTemplateDto: CreateTemplateDto,
    @Req() res: Response,
    @Res() req: Request,
  ): Promise<Template> {
    return this.templateService.createTemplate(CreateTemplateDto, res, req);
  }
  @Get(':clientId')
  findAllById(@Param('clientId') clientId): Promise<Template> {
    return this.templateService.findTemplate(clientId);
  }
  @Get()
  async findAllTemplate(): Promise<Template[]> {
    return this.templateService.findAllTemplate();
  }

}
