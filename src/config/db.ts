import mongoose from 'mongoose';
import { POSTGRE_DB_PASS } from '../utils/constants/env';
/**
 * This function connects with production database (MongoDb)
 *
 * @async
 * @returns {*}
 */
export const connectToDatabase = async () => {
  try {
    await mongoose.connect(POSTGRE_DB_PASS);
    console.log('Successfully connected to DB');
  } catch (error) {
    console.error('Could not connect to DB', error);
    process.exit(1);
  }
};
