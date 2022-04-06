const fs = require('fs/promises');

function getTalkers() {
  return fs.readFile('./talker.json', 'utf-8')
    .then((content) => JSON.parse(content));
}

module.exports = { getTalkers };
