const fs = require('fs/promises');

function getTalkers() {
  return fs.readFile('./talker.json', 'utf-8')
    .then((content) => JSON.parse(content));
}

function setTalkers(newTalker) {
  return fs.writeFile('./talker.json', JSON.stringify(newTalker));
}

const generateId = () => {
  const json = fs.readFile('./talker.json', 'utf-8')
    .then((content) => JSON.parse(content))
    .then((arr) => arr.length)
    .then((num) => num + 1);
  return json;
};

module.exports = { getTalkers, setTalkers, generateId };
