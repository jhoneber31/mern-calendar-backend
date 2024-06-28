const mongosse = require('mongoose');

const dbConnection = async () => {
  try {
    await mongosse.connect(process.env.DB_CNN);
    console.log('DB Online');
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de iniciar la base de datos');
  }
};

module.exports = {
  dbConnection,
}