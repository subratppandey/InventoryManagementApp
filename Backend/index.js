const mongoose = require('mongoose');

// Define the MongoDB connection string
const mongoURI = "mongodb+srv://aayush:aayush@firstone.qbq9qbu.mongodb.net/mydbbb?retryWrites=true&w=majority";
const express = require('express');
const cors = require('cors');
const router = require('./Routes/router');

// Create an instance of express to start a new Express application
const app = express();

const port = 3001;

// Use CORS to allow cross-origin requests
app.use(cors());

// Use express.json() middleware to parse JSON requests
app.use(express.json());

// Add router middleware to manage API routes
app.use(router);

// Connect to MongoDB using the mongoose connect method with the URI and connection options
mongoose.connect(mongoURI, {
    useNewUrlParser: true,     // Use the new URL parser to avoid deprecation warnings
    useUnifiedTopology: true  
})
.then(() => { // After successful connection to the database
    app.listen(port, () => console.log(`Server running on port ${port}`)); // Start the server on the defined port
})
.catch(err => console.log(err)); // Log any errors that occur during the connection process





