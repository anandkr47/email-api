const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const app = express();
const port = 3000;

// Load environment variables from .env file
require('dotenv').config();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use cors middleware with specific origin(s)
app.use(cors({
  origin: 'https://tetratrion.netlify.app', // Replace with your frontend's URL
  methods: ['GET', 'POST'], // Specify allowed HTTP methods
  allowedHeaders: ['Content-Type'], // Specify allowed headers
}));

// Load your route
const apiRouter = require('./routes/emailApi'); // Update the path if necessary

// Use your route
app.use('/', apiRouter);

// Set up a simple home page route
app.get('/', (req, res) => {
  res.send('Welcome to the Email API');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
