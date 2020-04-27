import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Req,
  Res,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { ClientsService } from './client.service';
import { Client } from './interfaces/client.interface';

import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
// @Controller('client')

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientsService) { }

  @Get()
  findAll(): Promise<Client[]> {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<Client> {
    return this.clientService.findOne(id);
  }
  @Get(':all/:clientId')
  findAllByClient(@Param('clientId') clientId): Promise<Client> {
    return this.clientService.findAllByClient(clientId);
  }
  @Post('new')
  create(@Body() createClientDto): Promise<Client> {
    return this.clientService.create(createClientDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<Client> {
    return this.clientService.delete(id);
  }

  @Put(':id')
  update(@Body() updateClientDto, @Param('id') id, @Query('companyId') companyId): Promise<Client> {
    console.log('companyId', companyId, id)
    return this.clientService.update(id, updateClientDto, companyId);
  }

  // @Put(':id')
  // findAndUpdate(@Param('id') @Query('companyId') id): Promise<Client> {
  //   return this.clientService.findAndUpdate(id);
  // }

  @Post()
  async signUp(
    @Body() createClientDto,
    @Req() res: Response,
    @Res() req: Request,
  ): Promise<Client> {
    return this.clientService.signUp(createClientDto, res, req);
  }

  @Get('test')
  @UseGuards(AuthGuard('jwt'))
  testAuthRoute() {
    return {
      message: 'you did it',
    };
  }

  @Patch(':id')
  findByIdAndToggleEnable(@Param('id') id): Promise<Client> {
    return this.clientService.findByIdAndToggleEnable(id);
  }
}
