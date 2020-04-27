import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CompaniesInterface } from './companies.interface';
import { DbWorker } from '../utils/dbworker.utils';

@Injectable()
export class CompaniesService {
  public dbWork;
  constructor(
    @InjectModel('Companies') private companyModel: Model<CompaniesInterface>,
  ) {
    this.dbWork = new DbWorker(companyModel);
  }

  /**
   *  This method creates a new company
   */
  async createCompany() {
    this.dbWork.create();
  }

  async findAll(): Promise<CompaniesInterface[]> {
    return await this.companyModel.find();
  }

  async findOne(id: string): Promise<CompaniesInterface> {
    return await this.companyModel.findOne({ _id: id });
  }

  async create(company: CompaniesInterface): Promise<CompaniesInterface> {
    const newCompaniesInterface = new this.companyModel(company);
    return await newCompaniesInterface.save();
  }

  async delete(id: string): Promise<CompaniesInterface> {
    return await this.companyModel.findByIdAndRemove(id);
  }

  async update(
    id: string,
    company: CompaniesInterface,
  ): Promise<CompaniesInterface> {
    return await this.companyModel.findByIdAndUpdate(id, company, {
      new: true,
    });
  }
}
