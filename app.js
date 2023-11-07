const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', (req, res) => {
  fs.readFile('./front/index.html', (err, data) => {
    if (err) {
      res.writeHead(200, 'Internal Server Error');
    } else {
      res.setHeader('Content-Type', 'text/html');
      res.send(data);
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
