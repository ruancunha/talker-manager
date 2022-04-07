const express = require('express');
const bodyParser = require('body-parser');

const talkersUtils = require('./fs-utils');
const { validateEmail, validatePassword } = require('./services/validations');
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

app.listen(PORT, () => {
  console.log('Online');
});
