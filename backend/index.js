const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const usersRoute = require('./routes/users');
const productsRoute = require('./routes/products');

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

mongoose.connect('mongodb://localhost/custom-store', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Couldn\'t connect to MongoDB...', err));

app.use('/api/users', usersRoute);
app.use('/api/products', productsRoute);

app.get('/', (req, res) => {
  res.send('Custom store backend...');
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log('Listening on port', PORT));