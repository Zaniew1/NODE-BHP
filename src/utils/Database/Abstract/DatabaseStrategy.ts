import { FilterQuery } from 'mongoose';
import { Filters } from './Filter';
export abstract class DatabaseStrategy<DataType> {
    abstract findOne(where?: FilterQuery<DataType>): Promise<DataType | null>;
    abstract findMany(where?: FilterQuery<DataType>): Promise<DataType[]>;
    abstract create(data: DataType): Promise<DataType>;
    abstract update(where: FilterQuery<DataType>, data: Partial<DataType>): Promise<DataType>;
    abstract delete(where: FilterQuery<DataType>): Promise<DataType>;
    abstract filterAdapter(where: FilterQuery<DataType>): Filters
}