const express = require('express');
const bodyParser = require('body-parser');

const talkersUtils = require('./fs-utils');
const {
  validateName,
  validateEmail,
  validatePassword,
  validateAge,
  validateTalk,
  validateTalkContent,
  validateToken } = require('./services/validations');
const { generateToken } = require('./services/token');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const talkers = await talkersUtils.getTalkers();

  return res.status(200).json(talkers);
});

app.get('/talker/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const talkers = await talkersUtils.getTalkers();
  const filteredTalkers = talkers.filter((t) => t.name.includes(q));
  return res.status(200).json(filteredTalkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await talkersUtils.getTalkers();

  const searchedTalker = talkers.find((t) => t.id === parseInt(id, 10));

  if (!searchedTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(200).json(searchedTalker);
});

app.post('/login', validateEmail, validatePassword, (req, res) => {
  const result = generateToken();
  return res.status(200).json({ token: result });
});

app.post('/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkContent,
  async (req, res) => {
  const { name, age, talk } = req.body;
  const id = await talkersUtils.generateId();
  const talkers = await talkersUtils.getTalkers();

  talkers.push({ id, name, age, talk });

  await talkersUtils.setTalkers(talkers);

  return res.status(201).json({ id, name, age, talk });
});

app.put('/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkContent,
  async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const talkers = await talkersUtils.getTalkers();

  const talkerIndex = talkers.findIndex((t) => t.id === parseInt(id, 10));

  talkers[talkerIndex] = { ...talkers[talkerIndex], name, age, talk };

  await talkersUtils.setTalkers(talkers);

  return res.status(200).json({ id: parseInt(id, 10), name, age, talk });
});

app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const talkers = await talkersUtils.getTalkers();
  const talkerIndex = talkers.findIndex((t) => t.id === parseInt(id, 10));
  talkers.splice(talkerIndex, 1);
  await talkersUtils.setTalkers(talkers);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log('Online');
});
