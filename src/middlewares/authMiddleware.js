const jwt = require("jsonwebtoken");
const { NotAuthorizedError } = require("../utils/appError");

const authMiddleware = (req, _, next) => {
  const [tokenType, token] = req.headers["authorization"].split(" ");
  if (!token) {
    next(new NotAuthorizedError(`Please, provide a token.`));
  }
  try {
    const user = jwt.decode(token, process.env.JWT_SECRET);
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    next(new NotAuthorizedError("Invalid token"));
  }
};

module.exports = authMiddleware;
