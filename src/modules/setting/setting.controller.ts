import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Res,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { CreateSettingDto } from './dto/create-setting.dto';
import { SettingService } from './setting.service';
import { Setting } from './interfaces/setting.interface';

@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Get('all/:clientId')
  findAll(@Param('clientId') clientId,): Promise<Setting[]> {
    console.log("client")
    return this.settingService.findAll(clientId);
  }

  @Get(':id')
  findOne(
    @Param('id') id,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Setting> {
    return this.settingService.findOne(id, req, res);
  }

  @Post()
  create(@Body() createSettingDto: CreateSettingDto): Promise<Setting> {
    return this.settingService.create(createSettingDto);
  }

  @Delete(':id')
  delete(
    @Param('id') id,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Setting> {
    return this.settingService.delete(id, req, res);
  }

  @Put(':id')
  update(
    @Body() updateSettingDto: CreateSettingDto,
    @Param('id') id,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Setting> {
    return this.settingService.update(id, updateSettingDto, req, res);
  }
}
