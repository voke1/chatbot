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
    const accountSid = 'AC40c20fd2dfcd0759d663e6bfa2b7aff4';
    const authToken = '9eba1a202d77c7a252d3ea02137c9dd4';
    const client = require('twilio')(accountSid, authToken);

    client.messages
      .create({
        from: 'whatsapp:+14155238886',
        body: 'Hello there!',
        to: 'whatsapp:+2348164637381'
      })
      .then(message => console.log(message.sid));
    console.log('server started')
    return this.clientService.findAll();
  }
  @Post()
  getResponse(@Body() clientResponse){
    const accountSid = 'AC40c20fd2dfcd0759d663e6bfa2b7aff4';
    const authToken = '9eba1a202d77c7a252d3ea02137c9dd4';
    const client = require('twilio')(accountSid, authToken);

    if(clientResponse.Body == 'Hello'){
      client.messages
        .create({
          from: 'whatsapp:+14155238886',
          body: 'welcome to ith bot',
          to: clientResponse.From,
        })
        .then(message => console.log(message.sid));

    }else{
      client.messages
        .create({
          from: 'whatsapp:+14155238886',
          body: clientResponse.Body,
          to: clientResponse.From,
        })
        .then(message => console.log(message.sid));
      console.log("clientResonse is:", clientResponse)

    }

    return clientResponse;

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