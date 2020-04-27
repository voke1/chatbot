import { CompaniesInterface } from '../companies/companies.interface';
import { Db } from 'typeorm';

export class DbWorker {
  constructor(protected entityModel) {}

  async findAll(): Promise<any[]> {
    return await this.entityModel.find();
  }

  async findOne(id: string): Promise<any> {
    return await this.entityModel.findOne({ _id: id });
  }

  async create(entity: any): Promise<any> {
    const newEntity = new this.entityModel(entity);
    return await newEntity.save();
  }

  async delete(id: string): Promise<any> {
    return await this.entityModel.findByIdAndRemove(id);
  }

  async update(id: string, entity: any): Promise<any> {
    return await this.entityModel.findByIdAndUpdate(id, entity, { new: true });
  }
}
