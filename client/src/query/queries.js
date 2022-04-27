// React Query
import { useQuery } from "react-query";

// API
import {
  getMultipleSets,
  getCommunitySets,
  getSearchedSets,
  getSingleSet,
  getSetCreator,
  getSetUsers,
} from "./api";

// Default Options
const defaultOptions = {
  staleTime: 1000 * 60 * 60 * 5,
  keepPreviousData: true,
  retry: (failureCount, error) => {
    if (failureCount > 3) return false;

    const { status } = error.response;
    let retry = true;
    switch (status) {
      case 403:
      case 401:
      case 404:
      case 400:
      case 422:
      case 429:
        retry = false;
        break;

      default:
        retry = true;
        break;
    }

    return retry;
  },
  retryDelay: (retryCount) => retryCount * 1500,
};

// Format Options
const formatOptions = (options) =>
  options
    ? {
        ...defaultOptions,
        ...options,
      }
    : defaultOptions;

// GET - Get Data of Multiple Sets
export const useGetMultipleSets = (key, { fbId, sets }) =>
  useQuery([key, sets], () => getMultipleSets(fbId, sets), defaultOptions);

// GET - Get Community Sets
export const useGetCommunitySets = (
  key,
  { fbId, filter, page, limit },
  options
) =>
  useQuery(
    [key, page],
    () => getCommunitySets(fbId, filter, page, limit),
    formatOptions(options)
  );

// POST - Get Searched Sets
export const useGetSearchedSets = (
  key,
  { fbId, filter, page, limit, ownedBy, query },
  options
) =>
  useQuery(
    [key, page],
    () => getSearchedSets(fbId, filter, page, limit, ownedBy, query),
    formatOptions(options)
  );

// GET - Get Data for a Specifc Set
export const useGetSingleSet = (key, { fbId, setId }) =>
  useQuery(key, () => getSingleSet(fbId, setId), defaultOptions);

// GET - Get Creator Data for a Specifc Set
export const useGetSetCreator = (key, { fbId, setId }) =>
  useQuery(key, () => getSetCreator(fbId, setId), defaultOptions);

// GET - Get Users Data for a Specifc Set
export const useGetSetUsers = (key, { fbId, setId }) =>
  useQuery(key, () => getSetUsers(fbId, setId), defaultOptions);
