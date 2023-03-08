module.exports = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  const environment = process.env.NODE_ENV === "production" ? null : err.stack;
  res.json({ message: err.message, stack: environment });
};
