const Joi = require("joi");

module.exports = {
  validateAuth: (req, res, next) => {
    const schemaUser = Joi.object({
      password: Joi.string().min(6).max(32).required(),
      email: Joi.string().email().min(3).max(32).required(),
      subscription: Joi.string().valid("starter", "pro", "business").optional(),
    });

    const { error } = schemaUser.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    next();
  },
  validateSubscription: (req, res, next) => {
    const schemaSubscreption = Joi.string()
      .valid("starter", "pro", "business")
      .required();

    const { error } = schemaSubscreption.validate(req.body.subscription);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    next();
  },
};
