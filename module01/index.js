const express = require('express');

const app = express();

app.use(express.json());

const users = ['Rodrigo', 'Priscila', 'Amanda'];

app.use((req, res, next) => {
  console.time('Request');
  console.log(`Método ${req.method} - URL: ${req.url}`);
  next();
  console.timeEnd('Request');
});

// Local middleware
const checkUserExists = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).send({ error: 'Name is required' });
  next();
};

const checkUserInArray = (req, res, next) => {
  const { index } = req.params;
  if (!users[index]) return res.status(404).send({ error: 'User does not exists' });
  next();
};

app.get('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;
  res.send({ name: users[index] });
});

app.get('/users', (req, res) => {
  res.send(users);
});

app.post('/users', checkUserExists, (req, res) => {
  const { name } = req.body;
  users.push(name);
  res.send({ name });
});

app.put('/users/:index', checkUserExists, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;
  users[index] = name;
  res.send(users);
});

app.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  res.send(users);
});

app.listen(3000);
