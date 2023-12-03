const { default: axios } = require('axios');
const express = require('express');
const app = express();
const cors = require('cors');
const port = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const loggerInstance = axios.create({ baseURL: process.env.BE_LOGGER_SERVICE });
const boardInstance = axios.create({ baseURL: process.env.BE_BOARD_SERVICE });

app.get('/health', async (req, res) => {
  return res.status(200).json({ status: 'ok' });
});

app.get('/board', async (req, res) => {
  await loggerInstance.post('/log', 'GET board list');
  const result = await boardInstance.get(`/board?keyword=${req.query.keyword}&searchType=${req.query.searchType}`);
  return res.send(result.data);
});

app.get('/board/:boardId', async (req, res) => {
  await loggerInstance.post('/log', 'GET board detail');
  const result = await boardInstance.get(`/board/${req.params.boardId}`);
  return res.send(result.data);
});

app.post('/board', async (req, res) => {
  await loggerInstance.post('/log', 'POST create board');
  const result = await boardInstance.post('/board', req.body);
  return res.send(result.data);
});

app.put('/board/:boardId', async (req, res) => {
  await loggerInstance.post('/log', 'PUT update board');
  const result = await boardInstance.put(`/board/${req.params.boardId}`, req.body);
  return res.send(result.data);
});

app.delete('/board/:boardId', async (req, res) => {
  await loggerInstance.post('/log', 'DELETE delete board');
  const result = await boardInstance.delete(`/board/${req.params.boardId}`);
  return res.send(result.data);
});

app.listen(port, () => {
  console.log(`✅ Listening on port : ${port}`);
});
