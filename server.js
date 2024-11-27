const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/banking1' );

// Check connection
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.use('/api', require('./routes/api'));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
