module.exports = (_, res) => {
  res.status(404).json({ message: "Oops! Resource not found..." });
};
