const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const option = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
};

const app = express();

mongoose.connect(process.env.MLAB_CONNECTION || process.env.MLAB, option);
mongoose.connection.once('open', () => {
  console.log('Connected to mLab DB');
});

// Init Middleware
app.use(
  express.json({
    extended: false
  })
);

app.get('/', (req, res) => res.json({ message: 'Admin Pro Hotels' }));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
