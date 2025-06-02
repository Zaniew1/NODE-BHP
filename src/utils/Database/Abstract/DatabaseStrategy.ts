import { FilterQuery } from 'mongoose';
import { Filters } from './Filter';
export abstract class DatabaseStrategy<DataType> {
    abstract findOne(where?: FilterQuery<DataType>): Promise<DataType | null>;
    abstract findMany(where?: FilterQuery<DataType>): Promise<DataType[]>;
    abstract create(data: DataType): Promise<DataType>;
    abstract update(id: number, data: Partial<DataType>): Promise<DataType>;
    abstract delete(id: number): Promise<DataType>;
    abstract filterAdapter(where: FilterQuery<DataType>): Filters
}