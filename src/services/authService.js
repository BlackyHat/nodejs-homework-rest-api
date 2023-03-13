const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { NotAuthorizedError } = require("../utils/appError");

const register = async (password, email) => {
  const user = new User({ email, password });
  await user.save();
};
const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotAuthorizedError(`No user with email:${email} was found.`);
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError("Wrong password.");
  }

  const token = jwt.sign(
    {
      _id: user.id,
    },
    process.env.JWT_SECRET
  );
  return token;
};

module.exports = {
  register,
  login,
};
