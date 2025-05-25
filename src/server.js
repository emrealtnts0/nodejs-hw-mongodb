// filepath: nodejs-hw-mongodb/src/server.js
const express = require('express');
const cors = require('cors');
const pino = require('pino');

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

const setupServer = () => {
  const app = express();

  // Middleware
  app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  app.use(express.json());
  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  });

  // Root route with API instructions
  app.get('/', (req, res) => {
    res.status(200).json({
      message: "Welcome to Contacts API",
      instructions: {
        endpoints: [
          {
            path: "/contacts",
            method: "GET",
            description: "Get all contacts",
            response: {
              status: 200,
              message: "Successfully found contacts!",
              data: "Array of contact objects"
            }
          },
          {
            path: "/contacts/:contactId",
            method: "GET",
            description: "Get a specific contact by ID",
            response: {
              status: 200,
              message: "Successfully found contact with id {contactId}!",
              data: "Contact object"
            }
          }
        ]
      }
    });
  });

  // Routes
  app.get('/contacts', async (req, res) => {
    try {
      logger.info('Fetching all contacts...');
      const contacts = await require('./services/contacts').getAllContacts();
      logger.info(`Successfully fetched ${contacts.length} contacts`);
      res.status(200).json({
        status: 200,
        message: "Successfully found contacts!",
        data: contacts
      });
    } catch (error) {
      logger.error('Error fetching contacts:', {
        error: error.message,
        code: error.code,
        name: error.name,
        stack: error.stack
      });
      res.status(500).json({ 
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  });

  app.get('/contacts/:contactId', async (req, res) => {
    try {
      const { contactId } = req.params;
      logger.info(`Fetching contact with ID: ${contactId}`);
      
      if (!contactId) {
        logger.warn('Contact ID is missing');
        return res.status(400).json({ message: 'Contact ID is required' });
      }

      const contact = await require('./services/contacts').getContactById(contactId);
      
      if (!contact) {
        logger.warn(`Contact not found with ID: ${contactId}`);
        return res.status(404).json({ message: 'Contact not found' });
      }

      logger.info(`Successfully fetched contact with ID: ${contactId}`);
      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact
      });
    } catch (error) {
      logger.error('Error fetching contact:', {
        error: error.message,
        code: error.code,
        name: error.name,
        stack: error.stack,
        contactId: req.params.contactId
      });
      res.status(500).json({ 
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  });

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  return app;
};

module.exports = setupServer;
