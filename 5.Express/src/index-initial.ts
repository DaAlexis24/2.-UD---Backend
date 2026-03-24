import express from 'express';
import debug from 'debug';

const port = process.env.PORT || 3000;
const log = debug('Express-App:index');

const app = express();
log('Create server');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/', (req, res) => {
  res.statusCode = 201;
  res.send('Hello Post');
});

app.get('/api', (req, res) => {
  res.send('API REST');
});

app.listen(port, () => {
  log(`Example app listening on port ${port}`);
});
