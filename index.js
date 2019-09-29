const express = require('express');

const app = express();

app.get('/', (req, res) => {
  const { name } = req.query;
  return res.status(500).send({ message: `Name: ${name}` });
});

app.listen(3000);
