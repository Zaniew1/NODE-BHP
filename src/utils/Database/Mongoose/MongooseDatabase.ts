import { FilterQuery, Model } from "mongoose";
import {  DatabaseStrategy } from "../Abstract/DatabaseStrategy";
import { Filters } from "../Abstract/Filter";

export class MongooseGeneric<T> extends DatabaseStrategy<T> {
  constructor(private model: Model<T>) {
    super();
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

  public async update(where: FilterQuery<T>, data: Partial<T>): Promise<T> {
    const updated = await this.model.findOneAndUpdate(where, data, { new: true }).lean().exec() as T;
    return updated;
  }

  public async delete(where: FilterQuery<T>): Promise<T> {
     const filters = this.filterAdapter(where);
    const deleted = await this.model.findOneAndDelete(filters).lean().exec() as T;
    return deleted;
  }
  public filterAdapter(filter: Filters){
    return filter;
  }
}

