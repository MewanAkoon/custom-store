const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require("cors");

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Custom store backend...');
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log('Listening on port', PORT));