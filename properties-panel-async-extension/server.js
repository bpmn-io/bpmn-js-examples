const express = require('express');
const cors = require('cors');

const spells = [
  'Avada Kedavra',
  'Crucio',
  'Vulnera Sanentur',
  'Vingardium Leviosa',
  'Alohomora'
];

// express server which returns spells
const app = express();

app.use(cors());
app.options('*', cors());

app.get('/spell', (req, res) => {
  res.json(spells);
});

app.listen(1234, () => {
  console.log('Listening on port 1234');
});
