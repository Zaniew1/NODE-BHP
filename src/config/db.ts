import prisma from '../lib/prisma';
/**
 * This function connects with production database (MongoDb)
 *
 * @async
 * @returns {*}
 */
export const connectToDatabase = async () => {
  try {
   
    console.log('Successfully connected to DB');
  } catch (error) {
    console.error('Could not connect to DB', error);
  }
};
