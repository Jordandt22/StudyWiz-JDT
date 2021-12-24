const Joi = require("joi");

// Privacy
const PrivacySchema = Joi.object().keys({
  hideCreator: Joi.boolean().required(),
  private: Joi.boolean().required(),
});

// Term
const TermSchema = Joi.object().keys({
  term: Joi.string().trim().min(1).max(100).required(),
  definition: Joi.string().trim().min(1).max(1000).required(),
});

// Set
const SetSchema = Joi.object()
  .keys({
    title: Joi.string().trim().min(1).max(100).required(),
    privacy: PrivacySchema,
    terms: Joi.array().min(1).max(50).items(TermSchema).required(),
  })
  .options({ abortEarly: false });

// Set ID
const SetIdSchema = Joi.object().keys({
  setId: Joi.string().trim().min(1).max(500).required(),
});

// Multiple Sets
const MultipleSetsSchema = Joi.object()
  .keys({
    sets: Joi.array().min(1).max(20).items(SetIdSchema).required(),
  })
  .options({ abortEarly: false });

// Community Search
const CommunitySearchSchema = Joi.object()
  .keys({
    filter: Joi.string().min(1).max(50).required(),
    ownedBy: Joi.string().min(1).max(50).required(),
  })
  .options({ abortEarly: false });

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
  schemas: { SetSchema, MultipleSetsSchema, CommunitySearchSchema },
};
