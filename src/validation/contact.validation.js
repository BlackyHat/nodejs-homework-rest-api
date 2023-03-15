const Joi = require("joi");

module.exports = {
  validateContact: (req, res, next) => {
    const schemaContact = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().min(3).max(30).required(),
      phone: Joi.string().required(),
      favorite: Joi.boolean().optional(),
    });

    const { error } = schemaContact.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    next();
  },
};
