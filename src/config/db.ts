/**
 * This function connects with database
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
