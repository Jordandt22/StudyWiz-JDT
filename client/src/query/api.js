// Axios
import axios from "axios";

// Config
import { urls } from "../config/urls";

// Utils
const { SETS_URI } = urls;
const createURI = (fbId) => SETS_URI + `/user/${fbId}`;

// GET - Get Data for Multiple Sets
export const getMultipleSets = async (fbId, sets) =>
  await axios.post(createURI(fbId) + "/multiple", {
    sets: sets.map((set) => ({
      setId: set.setId ? set.setId : set._id,
    })),
  });

// GET - Get Community Sets
export const getCommunitySets = async (fbId, filter, page, limit) =>
  await axios.get(
    createURI(fbId) + `/community/${filter}/page/${page}/limit/${limit}`
  );

// POST - Get Searched Sets
export const getSearchedSets = async (
  fbId,
  filter,
  page,
  limit,
  ownedBy,
  query
) =>
  await axios.post(
    createURI(fbId) + `/community/page/${page}/limit/${limit}/search/${query}`,
    {
      filter,
      ownedBy,
    }
  );

// GET - Get Data for a Specific Set
export const getSingleSet = async (fbId, setId) =>
  await axios.get(createURI(fbId) + `/${setId}`);

// GET - Get Creator Data for a Specific Set
export const getSetCreator = async (fbId, setId) =>
  await axios.get(createURI(fbId) + `/${setId}/creator`);

// GET - Get Users Data for a Specific Set
export const getSetUsers = async (fbId, setId) =>
  await axios.get(createURI(fbId) + `/${setId}/users`);

// POST - Create a Set
export const createSet = async (fbId, setId, set, cb) =>
  await axios
    .post(createURI(fbId), {
      ...set,
    })
    .then((data) => cb(data, null))
    .catch((err) => cb(null, err));

// POST - Copy a Set
export const copySet = async (fbId, setId, cb) =>
  await axios
    .post(createURI(fbId) + `/${setId}/copy`)
    .then((data) => cb(data, null))
    .catch((err) => cb(null, err));

// DELETE - Delete a Set
export const deleteSet = async (fbId, setId, cb) =>
  await axios
    .delete(createURI(fbId) + `/${setId}`)
    .then((data) => cb(data, null))
    .catch((err) => cb(null, err));

// PATCH - Edit a Set
export const editSet = async (fbId, setId, set, cb) =>
  await axios
    .patch(createURI(fbId) + `/${setId}`, {
      ...set,
    })
    .then((data) => cb(data, null))
    .catch((err) => cb(null, err));
