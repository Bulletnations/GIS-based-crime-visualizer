const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./router/routes'); // Import routes


const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB database (replace with your connection string)
mongoose.connect('mongodb://localhost:27017/mydatabase')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Apply body-parser middleware
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Mount routes with base path of '/api'
app.use('/', routes)

// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}`));
