const Joi = require("joi");

// Firebase ID
const FirebaseIDSchema = Joi.object()
  .keys({
    fbId: Joi.string().trim().min(1).max(500).required(),
    setId: Joi.string().trim().min(1).max(500),
  })
  .options({ abortEarly: false });

// Set ID
const SetIdSchema = Joi.object()
  .keys({
    setId: Joi.string().trim().min(1).max(500).required(),
  })
  .options({ abortEarly: false });

module.exports = {
  validator: (schema) => async (req, res, next) => {
    const result = schema.validate(req.params);
    const error = result.error;
    if (error) {
      let errors = {};
      error.details.map((e) => (errors[e.context.label] = e.message));
      return res.status(422).json({ errors });
    }

    next();
  },
  schemas: { FirebaseIDSchema, SetIdSchema },
};
