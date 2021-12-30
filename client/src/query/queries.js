// React Query
import { useQuery } from "react-query";

// API
import { getMultipleSets, getCommunitySets } from "./api";

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
