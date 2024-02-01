const express = require('express');
const cors = require('cors');
const todo = require('./api/todo');
const dotenv = require('dotenv');
const {connectToMongoDB} = require('./db/mongodb');

connectToMongoDB();

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

app.use('/api', todo);

//listen to a port
app.listen (process.env.SERVER_PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.SERVER_PORT}`);
});
