const Contact = require('../db/Contact');
const pino = require('pino');

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

const getAllContacts = async () => {
  try {
    logger.info('Attempting to fetch all contacts...');
    const contacts = await Contact.find();
    logger.info(`Found ${contacts.length} contacts in the database`);
    return contacts;
  } catch (error) {
    logger.error('Error in getAllContacts:', error);
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    logger.info(`Attempting to fetch contact with ID: ${contactId}`);
    const contact = await Contact.findById(contactId);
    logger.info(contact ? 'Contact found' : 'Contact not found');
    return contact;
  } catch (error) {
    logger.error('Error in getContactById:', error);
    throw error;
  }
};

module.exports = {
  getAllContacts,
  getContactById
}; 