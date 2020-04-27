import { Injectable } from '@nestjs/common';
import { Template } from './interfaces/template.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ResponseService } from '../services/ResponseHandler/response-handler.service';
import * as bcrypt from 'bcrypt';
import { tsThisType } from '@babel/types';

@Injectable()
export class TemplateService {
  protected BASE_URL = process.env.BASE_URL;

  constructor(
    @InjectModel('Template') private templateModel: Model<Template>,
    private responseService: ResponseService,
  ) {}

  async createTemplate(
    exportedTemplate: Template,
    req,
    res,
  ): Promise<Template> {
    const newTemplate = new this.templateModel({
      templateName: exportedTemplate.templateName,
      template: exportedTemplate['template'],
      clientId :exportedTemplate["clientId"]
    });

    try {
      const template = await newTemplate.save();
      if (template) {
        return this.responseService.requestSuccessful(res, {
          success: true,
          message: 'Template exported successfully',
          data: template,
        });
      }
      return this.responseService.clientError(res, {
        success: false,
        message: 'Template could not be exported. Please try again',
      });
    } catch (e) {
      return this.responseService.serverError(res, e.message);
    }
  }
  async findTemplate(clientId: string): Promise<Template> {
    return await this.templateModel.find({ clientId });
  }
  async findAllTemplate(): Promise<Template[]> {
    console.log("called fetch")
    return await this.templateModel.find();
  }
}
