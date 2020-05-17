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


// Using twilio for whatsapp chatbot

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
        body: 'Hello ther',
        to: 'whatsapp:+2348164637381'
      })
      .then(message => console.log(message.sid));
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
          body: 'welcome to ITH Bot. how may I be of help?',
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


  @Post()
  async signUp(
    @Body() createClientDto,
    @Req() res: Response,
    @Res() req: Request,
  ): Promise<Client> {
    return this.clientService.signUp(createClientDto, res, req);
  }


  @Patch(':id')
  findByIdAndToggleEnable(@Param('id') id): Promise<Client> {
    return this.clientService.findByIdAndToggleEnable(id);
  }
}
