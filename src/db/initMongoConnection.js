const mongoose = require('mongoose');
const pino = require('pino');
const express = require('express');

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

const initMongoConnection = async () => {
  try {
    const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } = process.env;
    
    if (!MONGODB_USER || !MONGODB_PASSWORD || !MONGODB_URL || !MONGODB_DB) {
      throw new Error('Missing required MongoDB environment variables');
    }

    const uri = `mongodb+srv://${encodeURIComponent(MONGODB_USER)}:${encodeURIComponent(MONGODB_PASSWORD)}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;
    
    logger.info('Attempting to connect to MongoDB...');
    await mongoose.connect(uri);
    logger.info('Mongo connection successfully established!');
  } catch (error) {
    logger.error('MongoDB connection error:', {
      message: error.message,
      code: error.code,
      name: error.name
    });
    process.exit(1);
  }
};

module.exports = initMongoConnection; 