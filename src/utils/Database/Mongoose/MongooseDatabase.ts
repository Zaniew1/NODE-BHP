import { FilterQuery, Model } from "mongoose";
import {  DatabaseStrategy } from "../Abstract/DatabaseStrategy";
import { Filters } from "../Abstract/Filter";

export class MongooseGeneric<T> implements DatabaseStrategy<T> {
  constructor(private model: Model<T>) {
  }

  public async findOne(where: FilterQuery<T>): Promise<T | null> {
    return await this.model.findOne(where).lean().exec() as T | null;;
  }

  public async findMany(where?: FilterQuery<T>): Promise<T[]> {
    return await this.model.find(where || {}).lean().exec() as T[];
  }

  public async create(data: Partial<T>): Promise<T> {
    const doc = new this.model(data);
    await doc.save();
    return doc.toObject();
  }

  public async update(id: number, data: Partial<T>): Promise<T> {
    const updated = await this.model.findByIdAndUpdate(id, data, { new: true }).lean().exec() as T;
    return updated;
  }

  public async delete(id: number): Promise<T> {
    const deleted = await this.model.findByIdAndDelete(id).lean().exec() as T;
    return deleted;
  }
  public filterAdapter(filter: Filters){
    return filter;
  }
}

