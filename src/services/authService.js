const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { randomUUID } = require("crypto");
const gravatar = require('gravatar');
const sgMail = require('@sendgrid/mail');
const User = require('../models/user.model');
const { NotAuthorizedError, ConflictError, NotFoundError, AppError } = require('../utils/appError');

const { JWT_SECRET, SENDGRID_API_KEY, SENDGRID_EMAIL } = process.env;
const baseURL = `http://localhost:8080/api`;

sgMail.setApiKey(SENDGRID_API_KEY);

const register = async (credentials) => {
  const { password, email } = credentials;

  const candidate = await User.findOne({ email });

  if (candidate) {
    throw new ConflictError('Email in use.');
  }

  const verificationToken = randomUUID();

  const avatarUrl = gravatar.url(email, { s: '250', r: 'pg', d: 'mp' });

  const newUser = new User({ email, password, avatarUrl, verificationToken });
  await newUser.save();

  const msg = {
    to: email,
    from: SENDGRID_EMAIL,
    subject: 'Thank you for registration!',
    text: `Welcome to the service. To get full access follow the link: ${baseURL}/users/verify/${verificationToken}`,
    html: `<strong>Welcome to the service. To get full access follow the link: ${baseURL}/users/verify/${verificationToken}</strong>`,
  };
  await sgMail.send(msg);

  return newUser;
};

const login = async (credentials) => {
  const { password, email } = credentials;

  const user = await User.findOne({ email });
  if (!user) {
    throw new NotAuthorizedError('Email or password is wrong');
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError('Email or password is wrong');
  }

  if (!user.verify){
    throw new NotAuthorizedError('Account is not activated');
  }

  user.token = jwt.sign(
    {
      id: user._id,
    },
    JWT_SECRET,
    { expiresIn: '12h' }
  );

  await User.findByIdAndUpdate(user._id, { token: user.token });

  return user;
};
const logout = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new NotAuthorizedError('Not authorized.');
  }

  await User.findByIdAndUpdate(id, { token: '' });
};

const updatedProfile = async (id, data) => {
  await User.findOneAndUpdate(id, { data });
};

const verificateProfile = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw new NotFoundError();
  }
const newUser =  await User.findOneAndUpdate({ _id: user._id }, {$set: {verificationToken: null, verify: true}}, {new:true});
console.log(newUser)  
return;
};

const reVerificateProfile = async (userData) => {
const {email}= userData;
if (!email) {
  throw new AppError(400, "Error. Missing required email field.");}

  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError();
  }
  if (user.verify) {
    throw new AppError(400, 'Verification has already been passed');
  }


  const verificationToken = randomUUID();
  await User.findOneAndUpdate({ _id: user._id}, {$set: {verificationToken }});

  const msg = {
    to: email,
    from: SENDGRID_EMAIL,
    subject: 'Thank you for registration!',
    text: `Welcome to the service. To get full access follow the link: ${baseURL}/users/verify/${verificationToken}`,
    html: `<strong>Welcome to the service. To get full access follow the link: ${baseURL}/users/verify/${verificationToken}</strong>`,
  };
  await sgMail.send(msg);
  return;
};

module.exports = {
  register,
  login,
  logout,
  updatedProfile,
  verificateProfile,
  reVerificateProfile
};
