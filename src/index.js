// filepath: nodejs-hw-mongodb/src/index.js
require('dotenv').config();
const setupServer = require('./server');
const initMongoConnection = require('./db/initMongoConnection');
const pino = require('pino');

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

const startServer = async () => {
  try {
    // Check environment variables
    const requiredEnvVars = ['MONGODB_USER', 'MONGODB_PASSWORD', 'MONGODB_URL', 'MONGODB_DB'];
    const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
    
    if (missingEnvVars.length > 0) {
      throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    }

    logger.info('Starting server initialization...');
    
    // Initialize MongoDB connection
    try {
      await initMongoConnection();
    } catch (dbError) {
      logger.error('Database connection failed:', {
        error: dbError.message,
        code: dbError.code,
        name: dbError.name
      });
      throw dbError;
    }

    // Setup and start the server
    try {
      const app = setupServer();
      const PORT = process.env.PORT || 3000;
      
      app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
      }).on('error', (err) => {
        logger.error('Server failed to start:', {
          error: err.message,
          code: err.code,
          name: err.name
        });
        throw err;
      });
    } catch (serverError) {
      logger.error('Server setup failed:', {
        error: serverError.message,
        code: serverError.code,
        name: serverError.name
      });
      throw serverError;
    }
  } catch (error) {
    logger.error('Application failed to start:', {
      error: error.message,
      code: error.code,
      name: error.name,
      stack: error.stack
    });
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', {
    error: error.message,
    code: error.code,
    name: error.name,
    stack: error.stack
  });
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection:', {
    reason: reason.message || reason,
    stack: reason.stack
  });
  process.exit(1);
});

startServer();
