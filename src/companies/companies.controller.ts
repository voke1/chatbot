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
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesInterface} from './companies.interface';

@Controller('companies')
export class CompaniesController {

    constructor(private readonly companyService: CompaniesService) { }

    @Get()
    findAll(): Promise<CompaniesInterface[]> {
        return this.companyService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id): Promise<CompaniesInterface> {
        return this.companyService.findOne(id);
    }

    @Post()
    create(@Body() createClientDto): Promise<CompaniesInterface> {
        return this.companyService.create(createClientDto);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<CompaniesInterface> {
        return this.companyService.delete(id);
    }

    @Put(':id')
    update(@Body() updateClientDto, @Param('id') id): Promise<CompaniesInterface> {
        return this.companyService.update(id, updateClientDto);
    }

    // @Patch(':id')
    // findByIdAndToggleEnable(@Param('id') id): Promise<CompaniesInterface> {
    //     return this.clientService.findByIdAndToggleEnable(id);
    // }
}
