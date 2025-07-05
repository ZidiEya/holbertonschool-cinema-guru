// Import the Express framework
const express = require('express');

// Import Sequelize instance (database configuration)
const sequelize = require('./config/database');

// Middleware for parsing request bodies
const bodyParser = require('body-parser');

// Enable Cross-Origin Resource Sharing (CORS)
const cors = require('cors');

// Import route handlers
const authRouter = require('./routes/auth');
const titlesRouter = require('./routes/titles');
const userActivitiesRouter = require('./routes/userActivities');

// Node.js File System module for reading/writing files
const fs = require("fs");

// Load environment variables from a .env file into process.env
require('dotenv').config();

// Initialize Express app
const app = express();

// Use CORS middleware to allow requests from other origins
app.use(cors());

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount routers on specified paths
app.use('/api/auth', authRouter);                // Routes for authentication (register, login, etc.)
app.use('/api/titles', titlesRouter);            // Routes for title-related endpoints
app.use('/api/activities', userActivitiesRouter); // Routes for user activity tracking

// Define the port the server will run on (default to 3000 if not specified in .env)
const PORT = process.env.PORT || 3000;

// Connect to the database and start the server
sequelize.sync().then(() => {
  console.log('Database connected successfully.');

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

sequelize.sync({ force: true })
    .then(async () => {
        console.log(`Database & tables created!`);
        console.log('Postgress Connected');
        fs.readFile("dump.sql", 'utf8', async (err, data) => {
            await sequelize.query(data)
            console.log("DB Seeded");
        })
    })
    .catch(err => console.log(err));

const port = process.env.PORT || 8000;

app.listen(port, () => console.log('Server running...'));
