# Node.js MongoDB Homework

This project is a RESTful API for managing contacts, built with Node.js, Express, and MongoDB.

## Live Demo

The application is deployed on Render: [https://nodejs-hw-mongodb-5tvr.onrender.com/](https://nodejs-hw-mongodb-5tvr.onrender.com/)

## API Endpoints

Base URL: `https://nodejs-hw-mongodb-5tvr.onrender.com`

### Root Endpoint
- `GET /`
  - Returns API instructions and available endpoints
  - Response: Welcome message and endpoint documentation

### Contacts Endpoints
- `GET /contacts`
  - Returns all contacts
  - Response:
    ```json
    {
      "status": 200,
      "message": "Successfully found contacts!",
      "data": [
        {
          "name": "string",
          "phoneNumber": "string",
          "email": "string",
          "isFavourite": boolean,
          "contactType": "work" | "home" | "personal",
          "createdAt": "date",
          "updatedAt": "date"
        }
      ]
    }
    ```

- `GET /contacts/:contactId`
  - Returns a specific contact by ID
  - Response (Success):
    ```json
    {
      "status": 200,
      "message": "Successfully found contact with id {contactId}!",
      "data": {
        "name": "string",
        "phoneNumber": "string",
        "email": "string",
        "isFavourite": boolean,
        "contactType": "work" | "home" | "personal",
        "createdAt": "date",
        "updatedAt": "date"
      }
    }
    ```
  - Response (Not Found):
    ```json
    {
      "message": "Contact not found"
    }
    ```

## Project Structure

```
nodejs-hw-mongodb/
├── src/
│   ├── db/
│   │   ├── Contact.js         # Contact model
│   │   └── initMongoConnection.js  # MongoDB connection setup
│   ├── services/
│   │   └── contacts.js        # Contact service layer
│   ├── index.js              # Application entry point
│   └── server.js             # Express server setup
├── .env.example              # Example environment variables
├── .gitignore               # Git ignore file
├── .prettierrc             # Prettier configuration
├── package.json            # Project dependencies and scripts
└── README.md              # Project documentation
```

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/nodejs-hw-mongodb.git
   cd nodejs-hw-mongodb
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```
   PORT=3000
   MONGODB_USER=your_mongodb_user
   MONGODB_PASSWORD=your_mongodb_password
   MONGODB_URL=your_mongodb_cluster_url
   MONGODB_DB=contacts_db
   NODE_ENV=development
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Features

- RESTful API for contact management
- MongoDB integration with Mongoose
- Environment variable configuration
- Error handling and logging with Pino
- CORS enabled
- Input validation
- Proper HTTP status codes
- API documentation

## Contact Model

The Contact model includes the following fields:
- `name` (string, required): Contact's name
- `phoneNumber` (string, required): Contact's phone number
- `email` (string): Contact's email address
- `isFavourite` (boolean, default: false): Whether the contact is marked as favorite
- `contactType` (enum, required, default: 'personal'): Type of contact ('work', 'home', 'personal')
- `createdAt` (date, auto-generated): Creation timestamp
- `updatedAt` (date, auto-generated): Last update timestamp

## Development

- The project uses ESLint for code linting
- Prettier for code formatting
- Nodemon for development server with auto-reload
- Environment variables for configuration
- MongoDB Atlas for database hosting

## License

MIT 