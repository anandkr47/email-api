const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());

// Load environment variables from .env file
require('dotenv').config();

// Load your route
const apiRouter = require('./routes/emailApi'); // Update the path if necessary

// Use your route
app.use('/', apiRouter);

const allowedOrigins = ['https://tetratrion.netlify.app'];
app.use(cors({
  origin: allowedOrigins,
}));

// Set up a simple home page route
app.get('/', (req, res) => {
  res.send('Welcome to the Email API');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
