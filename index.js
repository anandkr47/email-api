const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const cors = require('cors');
const app = express();
const port = 3000;

// Load environment variables from .env file
require('dotenv').config();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(flash());

const allowedOrigins = ['https://tetratrion.netlify.app'];
app.use(cors({
  origin: allowedOrigins,
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
