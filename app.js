const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');

app.use(express.static('front')); // 'front'는 정적 파일이 있는 디렉토리 경로입니다

const areas = ['daejeon', 'gwangju'];

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

areas.forEach((area) => {
  const jsonFilePath = path.join(__dirname, 'list', `${area}.json`);
  app.get(`/list/${area}.json`, (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.sendFile(jsonFilePath);
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `cli 창에서 컨트롤 누른후  옆에 포트 누르면 편리하게 확인 -> http://localhost:${PORT}/`
  );
});
