// db.js
const mongoose = require('mongoose');
const Logger = require('../utils/Logger');
const APP_CONFIG = require('../config');

const connectToDatabase = async () => {
  try {
    const connection = mongoose.connect(APP_CONFIG.MONGO_DB_URI);
    Logger.info(
      `Successfully connected to MongoDB database: ${APP_CONFIG.MONGODB_NAME}`
    );
    return connection;
  } catch (error) {
    Logger.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit the app if the connection fails
  }
};

module.exports = connectToDatabase;