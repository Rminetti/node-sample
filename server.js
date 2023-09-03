const fs = require('fs').promises;
const exists = require('fs').exists;
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get("/read/:file", async (req, res) => {
  const file = req.params.file;
  const filePath = path.join(__dirname, 'final', file + '.txt');
  const tempFilePath = path.join(__dirname, 'temp', file + '.txt');
  const content = await fs.readFile(filePath, 'utf-8');

  exists(tempFilePath, async (exist) => {
    if (exist) console.log('Temp file exists for' + file);
  });

  res.send(content);
});

app.post('/persist', async (req, res) => {
  const { title, content } = req.body;
  const fileTitle = title.toLowerCase();

  const tempFilePath = path.join(__dirname, 'temp', fileTitle + '.txt');
  const finalFilePath = path.join(__dirname, 'final', fileTitle + '.txt');
  
  console.log("Temp", tempFilePath)
  console.log("Persistent", finalFilePath)
  await fs.writeFile(tempFilePath, 'Writing content on temp file ' + fileTitle);

  exists(finalFilePath, async (exist) => {
    if (exist) {
      res.status(204).end();
    } else {
      await fs.writeFile(finalFilePath, content);
      res.status(201).json({ content });
    }
  })
});

app.listen(80);

