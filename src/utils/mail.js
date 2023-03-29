const sgMail = require('@sendgrid/mail');
const {SENDGRID_API_KEY, SENDGRID_EMAIL } = process.env;

const baseURL = `http://localhost:8080/api`;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendVerificationEmail = async (email, verificationToken) => {
  const msg = {
    to: email,
    from: SENDGRID_EMAIL,
    subject: 'Thank you for registration!',
    text: `Welcome to the service. Please, confirm your email by the link: ${baseURL}/users/verify/${verificationToken}`,
    html: `<strong>Welcome to the service. Please, confirm your email by the link: ${baseURL}/users/verify/${verificationToken}</strong>`,
  };
  await sgMail.send(msg);

};
const sendReVerificationEmail = async (email, verificationToken) => {
  const msg = {
    to: email,
    from: SENDGRID_EMAIL,
    subject: 'Email confirmation!',
    text: `Welcome to the service. To get full access, confirm your email by the link: ${baseURL}/users/verify/${verificationToken}`,
    html: `<strong>Welcome to the service. To get full access, confirm your email by the link: ${baseURL}/users/verify/${verificationToken}</strong>`,
};
  await sgMail.send(msg);

};


module.exports = {sendVerificationEmail, sendReVerificationEmail};