const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

require('dotenv').config();

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => {
  console.error('MongoDB connection error:', err);
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB connection established');
});

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const notesRouter = require('./routes/notes');
app.use('/api/notes', notesRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
