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
import { ActiveusersService } from './activeusers.service';
import { Activeusers } from './interfaces/activeusers.interface';
import { CreateActiveusersDto } from './dto/create-activeusers-dto';

@Controller('activeusers')
export class ActiveusersController {
  constructor(private activeusersService: ActiveusersService) {}
  @Post()
  async createActiveusers(
    @Body() CreateActiveUsersDto: CreateActiveusersDto,
    @Req() res: Response,
    @Res() req: Request,
  ): Promise<Activeusers> {
    return this.activeusersService.createActiveusers(CreateActiveUsersDto, res, req);
  }
 
  @Get()
  async findAll(): Promise<Activeusers[]> {
    return this.activeusersService.findAll();
  }
  @Delete(':id')
  delete(@Param('id') id): Promise<Activeusers> {
    return this.activeusersService.delete(id);
  }
}
