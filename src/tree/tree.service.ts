import { Injectable } from '@nestjs/common';
import { Tree } from './interfaces/tree.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ResponseService } from '../services/ResponseHandler/response-handler.service';
import * as bcrypt from 'bcrypt';
import { tsThisType } from '@babel/types';

@Injectable()
export class TreeService {
  protected BASE_URL = process.env.BASE_URL;

  constructor(
    @InjectModel('Tree') private treeModel: Model<Tree>,
    private responseService: ResponseService,
  ) {}

  async createTree(tree: Tree, req, res): Promise<Tree> {
    const newTree = new this.treeModel(tree);

    try {
      const chat_body = await newTree.save();
      if (chat_body) {
        return this.responseService.requestSuccessful(res, {
          success: true,
          message: 'Bot has been successfully deployed',
          chat_body,
        });
      }
      return this.responseService.clientError(res, {
        success: false,
        message: 'Bot could not be deployed. Please try again',
      });
    } catch (e) {
      return this.responseService.serverError(res, e.message);
    }
  }
  async findTree(id: string): Promise<Tree> {
    return await this.treeModel.findOne({ _id: id });
  }
  async findTreeByClient(clientId: string): Promise<Tree> {
    return await this.treeModel.find({ clientId }).populate("setting_id");
  }
  async findAllTrees(): Promise<Tree[]> {
    return await this.treeModel.find();
  }
  async updateTree(id: string, tree: Tree, req, res): Promise<Tree[]> {
    console.log(tree['chat_body']);
    try {
      const isFound = await this.treeModel.find({ _id: id });
      if (!isFound) {
        return this.responseService.clientError(res, 'Tree not found');
      }
      const updatedTree = await this.treeModel.findByIdAndUpdate(
        id,
        { chat_body: tree['chat_body'] },
        { new: true },
      );
      if (updatedTree) {
        return await this.responseService.requestSuccessful(res, {
          success: true,
          message: 'Tree updated successfully',
        });
      }
      return this.responseService.clientError(
        res,
        'An error occured while updating the tree',
      );
    } catch (e) {
      return this.responseService.serverError(res, e.message);
    }
  }
}
