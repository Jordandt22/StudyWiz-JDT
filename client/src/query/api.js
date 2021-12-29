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
      setId: set._id,
    })),
  });

// GET - Get Community Sets
export const getCommunitySets = async (fbId, filter, page, limit) =>
  await axios.get(
    createURI(fbId) + `/community/${filter}/page/${page}/limit/${limit}`
  );