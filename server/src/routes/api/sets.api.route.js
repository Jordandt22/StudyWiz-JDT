const setsRouter = require("express-promise-router")();
const {
  getSet,
  getSetCreator,
  getSetUsers,
  createSet,
  updateSet,
  deleteSet,
  copySet,
} = require("../../controllers/api/sets.api.ct");
const {
  validator: paramsValidator,
  schemas: { SetIdSchema },
} = require("../../validators/params.validator");
const {
  validator: bodyValidator,
  schemas: { SetSchema },
} = require("../../validators/body.validator");
const { getCacheData } = require("../../redis/redis.mw");
const { SET_KEY } = require("../../redis/redis.keys");
const { checkSet } = require("../../middleware/api.mw");

// Sets API

// ---- Sets ----

// GET - Get a Set
setsRouter.get(
  "/:setId",
  paramsValidator(SetIdSchema),
  getCacheData(SET_KEY),
  checkSet,
  getSet
);

// GET - Get a set's creator
setsRouter.get(
  "/:setId/creator",
  paramsValidator(SetIdSchema),
  getCacheData(SET_KEY),
  checkSet,
  getSetCreator
);

// GET - Get a set's users
setsRouter.get(
  "/:setId/users",
  paramsValidator(SetIdSchema),
  getCacheData(SET_KEY),
  checkSet,
  getSetUsers
);

// POST - Create a Set
setsRouter.post("/", bodyValidator(SetSchema), createSet);

// PATCH - Update a Set
setsRouter.patch(
  "/:setId",
  paramsValidator(SetIdSchema),
  bodyValidator(SetSchema),
  getCacheData(SET_KEY),
  checkSet,
  updateSet
);

// DELETE - Delete a Set
setsRouter.delete(
  "/:setId",
  paramsValidator(SetIdSchema),
  getCacheData(SET_KEY),
  checkSet,
  deleteSet
);

// POST - Copy Set
setsRouter.post(
  "/:setId/copy",
  paramsValidator(SetIdSchema),
  getCacheData(SET_KEY),
  checkSet,
  copySet,
  bodyValidator(SetSchema),
  createSet
);

module.exports = setsRouter;
