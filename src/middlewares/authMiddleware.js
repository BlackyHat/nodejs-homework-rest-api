const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { NotAuthorizedError } = require("../utils");
const { JWT_SECRET } = process.env;

const authMiddleware = async (req, _, next) => {
  const { authorization = "" } = req.headers;
  const [tokenType, token] = authorization.split(" ");

  if (tokenType !== "Bearer" || !token) {
    next(new NotAuthorizedError(`Not authorized.`));
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);

    if (!user || token !== user.token) {
      next(new NotAuthorizedError("Not authorized."));
    }

    req.user = user;
    next();
  } catch (error) {
    next(new NotAuthorizedError("Not authorized."));
  }
};

module.exports = authMiddleware;
