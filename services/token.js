const generateToken = () => {
  const chars = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomChars = '';
  while (randomChars.length < 16) {
    randomChars += chars[Math.floor(Math.random() * chars.length)];
  }
  return randomChars;
};

module.exports = { generateToken };
