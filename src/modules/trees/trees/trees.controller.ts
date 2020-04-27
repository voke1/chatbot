import {Controller, Get, Post, Param, Req, Body} from '@nestjs/common';
import {Request} from "express";
import {TreesService} from "./trees.service";


@Controller('trees')
export class TreesController {

    constructor(private readonly treeService:TreesService){

    }

    @Get()
    getAllTrees(@Req() request: Request): any[] {
        return this.treeService.getAllTrees();
    }

    @Get(':id')
    getTreeByCompanyId(@Param('id') id) {
    // return of([]);
        return `This is the id returned: ${id}`;
    }

    @Post()
    createNewTree(@Body() body){
        return this.treeService.createTree(body);
    }



}
