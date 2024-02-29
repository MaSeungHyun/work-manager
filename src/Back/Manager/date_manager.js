const getKorISODate = () => {
  const offset = 1000 * 60 * 60 * 9;
  const date = new Date(new Date().getTime() + offset).toISOString();

  return date;
};

module.exports = { getKorISODate };
