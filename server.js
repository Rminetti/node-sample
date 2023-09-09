const fs = require('fs').promises;
const exists = require('fs').exists;
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const pong = require('./util/pong');

const app = express();

app.use(bodyParser.json());

app.get('/ping', (req, res) => { res.send(pong()) });

app.get('/read/:file', async (req, res) => {
  const file = req.params.file;
  const filePath = path.join(__dirname, 'final', file + '.txt');
  const content = await fs.readFile(filePath, 'utf-8');

  res.send(content);
});

app.post('/persist', async (req, res) => {
  const { title, content } = req.body;
  const fileTitle = title.toLowerCase();
  const filePath = path.join(__dirname, 'final', fileTitle + '.txt');
  console.log('Persistent', filePath)

  exists(filePath, async (exist) => {
    if (exist) {
      res.status(204).end();
    } else {
      await fs.writeFile(filePath, content);
      res.status(201).json({ content });
    }
  })
});

app.listen(process.env.PORT);

