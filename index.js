const express = require('express');
const bodyParser = require('body-parser');

const talkersUtils = require('./fs-utils');

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

app.listen(PORT, () => {
  console.log('Online');
});
