const Joi = require("joi");

module.exports = {
  validator: (schema) => async (req, res, next) => {
    const result = schema.validate(req.body);
    const error = result.error;
    if (error) {
      let errors = {};
      error.details.map((e) => (errors[e.context.label] = e.message));
      return res.status(422).json({ errors });
    }

    next();
  },
  schemas: {},
};
