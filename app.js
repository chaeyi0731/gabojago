const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');

app.use(express.static('front'));

const jsonFilePath = path.join(__dirname, 'list', 'daejeon.json');

app.get('/', (req, res) => {
  fs.readFile('./front/index.html', (err, data) => {
    if (err) {
      console.error('Error reading HTML file:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.setHeader('Content-Type', 'text/html');
      res.send(data);
    }
  });
});
app.get('/list/daejeon.json', (req, res) => {
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('서버에서 데이터를 읽는 중 오류 발생:', err);
      res.status(500).send('서버에서 데이터를 읽는 중 오류 발생');
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    }
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});
