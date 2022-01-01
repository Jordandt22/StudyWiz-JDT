// React Query
import { useQuery } from "react-query";

// API
import { getMultipleSets, getCommunitySets, getSearchedSets } from "./api";

// Default Options
const defaultOptions = {
  staleTime: 1000 * 60 * 60 * 5,
  keepPreviousData: true,
  retry: 3,
};

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
    options
      ? {
          ...defaultOptions,
          ...options,
        }
      : defaultOptions
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
    options
      ? {
          ...defaultOptions,
          ...options,
        }
      : defaultOptions
  );