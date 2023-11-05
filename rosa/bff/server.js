const express = require('express');
const app = express();
const port = 4000;

app.get('/board', (req, res) => {
  res.send('GET board list');
});
app.get('/board/:boardId', (req, res) => {
  res.send('GET board detail');
});
app.post('/board', (req, res) => {
  res.send('POST create board');
});
app.put('/board/:boardId', (req, res) => {
  res.send('PUT update board');
});
app.delete('/board/:boardId', (req, res) => {
  res.send('DELETE delete board');
});

app.listen(port, () => {
  console.log(`✅ Listening on port : ${port}`);
});
