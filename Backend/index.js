const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://aayush:aayush@firstone.qbq9qbu.mongodb.net/mydbbb?retryWrites=true&w=majority";

const express = require('express');
const cors = require('cors');
const router = require('./Routes/router');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(router);

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
})
.catch(err => console.log(err));




