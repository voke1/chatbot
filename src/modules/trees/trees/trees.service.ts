import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {TreesDto} from "./trees.dto";
import {InjectModel} from '@nestjs/mongoose';
import {TreesInterface} from "./trees.interface";


@Injectable()
export class TreesService {

    private readonly trees: TreesDto[] = [];

    constructor(
        @InjectModel('tree')
        private readonly TreeModel: Model<TreesInterface>
    ) {
    }

    async createTree(tree): Promise<TreesInterface> {
        const createdTree = new this.TreeModel(tree);
        return await createdTree.save();
    }

    getAllTrees(): TreesDto[] {
        return this.TreeModel.find();
    }
}