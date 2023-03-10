module.exports = (err, req, res, next) => {
  res.status(res.statusCode || 500);
  const environment = process.env.NODE_ENV === "production" ? null : err.stack;
  res.json({ message: err.message, stack: environment });
};
