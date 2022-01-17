// Axios
import axios from "axios";

// Config
import { urls } from "../config/urls";

// Utils
const { SETS_URI } = urls;
const createURI = (fbId) => SETS_URI + `/user/${fbId}`;

// GET - Get Data for Multiple Sets
export const getMultipleSets = async (fbId, sets) =>
  await axios.post(createURI(fbId), {
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
