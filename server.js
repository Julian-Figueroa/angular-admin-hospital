const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const option = {
  useNewUrlParser: true
};

const app = express();

mongoose.connect(process.env.MLAB_CONNECTION || process.env.MLAB, option);
mongoose.connection.once('open', () => {
  console.log('Connected to mLab DB');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
