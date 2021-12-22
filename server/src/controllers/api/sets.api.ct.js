const User = require("../../models/user/user.model");
const Sets = require("../../models/sets/sets.model");
const {
  cacheData,
  removeCacheData,
  getCache,
} = require("../../redis/redis.mw");
const { USER_KEY, SET_KEY } = require("../../redis/redis.keys");
const { errorHandler } = require("../../utils/global.utils");
const {
  getFBUser,
  getMultipleFBUsers,
} = require("../../firebase/firebase.utils");

// Get User Cache
const getUserCache = async (fbId) => await getCache(USER_KEY, { fbId });

// Update User Cache
const updateUserCache = async (fbId, updatedUser) =>
  await cacheData(USER_KEY, { fbId }, updatedUser);

// Update Set Cache
const updateSetCache = async (setId, updatedSet) =>
  await cacheData(SET_KEY, { setId }, updatedSet);

// Remove Set Cache
const removeSetCache = async (setId) =>
  await removeCacheData(SET_KEY, { setId });

module.exports = {
  getSet: async (req, res, next) => {
    const { fbId, sets } = req.user;
    const { setId } = req.params;

    // Updated User & Set Data
    let updatedUser = req.user;
    let setData = req.set;
    const { creatorFbId, users } = setData;
    const isCreator = fbId === creatorFbId;

    // If the user is not the creator, check if the set is private
    if (!isCreator && setData.privacy.private)
      return errorHandler(res, 403, "SETS", "THIS SET IS ON PRIVATE MODE");

    // Checking if the set has been added already to the user's set list
    const setAdded = sets.some((set) => set.setId === setId);
    if (!setAdded) {
      // Adds the new set to the user's list
      updatedUser = await User.findOneAndUpdate(
        { fbId },
        {
          $push: { sets: { setId, creatorFbId } },
        },
        { returnDocument: "after" }
      );
    } else {
      // Updates the last requested time for the set in the user's list
      updatedUser = await User.findOneAndUpdate(
        { fbId, "sets.setId": setId },
        {
          $set: { "sets.$.lastRequested": new Date() },
        },
        { returnDocument: "after" }
      );
    }

    // Adding a user to the set if it isn't the creator
    const alreadyAddedToUsers = users.some((user) => user.fbId === fbId);
    if (!isCreator && !alreadyAddedToUsers) {
      setData = await Sets.findByIdAndUpdate(
        setId,
        { $push: { users: { fbId } } },
        { returnDocument: "after" }
      );
    }

    // Updating the Redis Cache
    updateUserCache(fbId, updatedUser);
    updateSetCache(setId, setData);
    res.status(200).json({ user: { sets: updatedUser.sets }, set: setData });
  },
  getSetCreator: async (req, res, next) => {
    const { fbId } = req.user;

    // Updated User & Set Data
    let setData = req.set;
    const {
      creatorFbId,
      privacy: { private, hideCreator },
    } = setData;
    const isCreator = fbId === creatorFbId;

    // If the user is not the creator, check if the set is private
    if (!isCreator && private)
      return errorHandler(res, 403, "SETS", "THIS SET IS ON PRIVATE MODE");

    // If the user is not the creator, check if hide creator mode is on
    if (!isCreator && hideCreator)
      return errorHandler(res, 200, "SETS", "THIS SET IS ON HIDE CREATOR MODE");

    // Creator
    if (isCreator) {
      const { name, picture } = req.fbUser;
      res.status(200).json({
        isCreator,
        creator: {
          fbId,
          displayName: name ? name : null,
          photoURL: picture ? picture : null,
        },
      });
    } else {
      // If not creator, get Firebaes user info
      await getFBUser(creatorFbId, (data) => {
        const { uid, displayName, photoURL } = data;

        res.status(200).json({
          isCreator,
          creator: {
            fbId: uid,
            displayName: displayName ? displayName : null,
            photoURL: photoURL ? photoURL : null,
          },
        });
      });
    }
  },
  getSetUsers: async (req, res, next) => {
    const { fbId } = req.user;

    // Updated User & Set Data
    let setData = req.set;
    const {
      creatorFbId,
      privacy: { private },
      users,
    } = setData;
    const isCreator = fbId === creatorFbId;

    // If the user is not the creator, check if the set is private
    if (!isCreator && private)
      return errorHandler(res, 403, "SETS", "THIS SET IS ON PRIVATE MODE");

    // Checking if there are any users
    if (users.length < 1) return res.status(200).json({ users: [] });

    // Get Firebase info of the set users
    await getMultipleFBUsers(users, (data) => {
      res.status(200).json({
        users: data.users.map((user) => {
          const { uid, displayName, photoURL } = user;

          return {
            fbId: uid,
            displayName: displayName ? displayName : null,
            photoURL: photoURL ? photoURL : null,
          };
        }),
      });
    });
  },
  createSet: async (req, res, next) => {
    const { fbId } = req.user;
    const { title, privacy: privacyData, terms } = req.body;
    const privacy = privacyData
      ? privacyData
      : { hideCreator: false, private: false };

    // Create Set
    const newSet = await Sets.create({
      title,
      creatorFbId: fbId,
      privacy,
      terms,
    });

    // Add Set to User Sets
    const newSetId = newSet.id;
    const updatedUser = await User.findOneAndUpdate(
      { fbId },
      { $push: { sets: { setId: newSetId, creatorFbId: fbId } } },
      { returnDocument: "after" }
    );

    // Updating the Redis Cache
    updateUserCache(fbId, updatedUser);
    updateSetCache(newSetId, newSet);
    res.status(200).json({ user: { sets: updatedUser.sets } });
  },
  updateSet: async (req, res, next) => {
    const { fbId } = req.user;
    const { setId } = req.params;
    const { title, privacy, terms } = req.body;

    // Updated User & Set Data
    let setData = req.set;

    // Checking if the user is the creator of the set
    const { creatorFbId } = setData;
    if (fbId !== creatorFbId)
      return errorHandler(
        res,
        403,
        "SETS",
        "UNAUTHORIZED ACTION - UPDATING A SET"
      );

    // Update the set
    setData = await Sets.findByIdAndUpdate(
      setId,
      { title, privacy, terms },
      { returnDocument: "after" }
    );

    // Updating the Redis Cache
    updateSetCache(setId, setData);
    res.status(200).json({ set: setData });
  },
  deleteSet: async (req, res, next) => {
    const { fbId, sets } = req.user;
    const { setId } = req.params;
    const { creatorFbId, users } = req.set;
    const isCreator = fbId === creatorFbId;
    const createdSet = sets.some(
      (set) => set.setId === setId && set.creatorFbId === fbId
    );
    if (!isCreator || !createdSet)
      return errorHandler(
        res,
        403,
        "SETS",
        "UNAUTHORIZED ACTION - DELETING A SET"
      );

    // Delete Set from Database and Redis
    await Sets.findByIdAndDelete(setId);
    removeSetCache(setId);

    // Remove Set from user's list
    const updatedUser = await User.findOneAndUpdate(
      { fbId },
      { $pull: { sets: { setId } } },
      { returnDocument: "after" }
    );

    // Remove set from all users' lists
    await User.updateMany(
      { sets: { $elemMatch: { setId } } },
      { $pull: { sets: { setId } } }
    );

    // Updating the cache of all the users' who used this set
    users.map(async (user) => {
      const { fbId: setUserFBId } = user;

      // Get Cached User
      const cachedUser = await getUserCache(setUserFBId);
      if (!cachedUser) return;

      // Filter out the set being deleted
      const cachedUserData = JSON.parse(cachedUser);
      const { sets } = cachedUserData;
      const updatedSets = sets.filter((set) => set.setId !== setId);

      // Update Redis Cache
      updateUserCache(setUserFBId, { ...cachedUserData, sets: updatedSets });
    });

    // Update Redis Cache
    updateUserCache(fbId, updatedUser);
    res.status(200).json({ user: { sets: updatedUser.sets } });
  },
  copySet: async (req, res, next) => {
    const { fbId } = req.user;
    const {
      title,
      terms,
      creatorFbId,
      privacy: { private },
    } = req.set;
    const isCreator = fbId === creatorFbId;

    // If the user is not the creator, check if the set is private
    if (!isCreator && private)
      return errorHandler(res, 403, "SETS", "THIS SET IS ON PRIVATE MODE");

    // Creating a new set and sending it to the next part
    req.body = {
      title: "Copy of " + title,
      terms: terms.map((term) => ({
        term: term.term,
        definition: term.definition,
      })),
    };

    next();
  },
};
