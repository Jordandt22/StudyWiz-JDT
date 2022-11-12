// Day.js
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);

export const sortSetsByRecent = (sets) =>
  sets
    .slice()
    .sort((a, b) => new Date(b.lastRequested) - new Date(a.lastRequested));

export const sortSetsByNewest = (sets) =>
  sets.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

export const sortSetsByOldest = (sets) =>
  sets.slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

export const sortSets = (sets, sortedBy) => {
  // Sorted By Filters
  const sortedSets =
    sortedBy === 1
      ? sortSetsByNewest(sets)
      : sortedBy === 2
      ? sortSetsByOldest(sets)
      : sortSetsByRecent(sets);

  return sortedSets;
};

export const filterSets = (fbId, sets, filter) => {
  // Main Filters -> (All, Mine, Favorite, Others)
  const mainFilteredSets =
    filter === 1
      ? sets.filter((set) => set.creatorFbId === fbId)
      : filter === 2
      ? sets.filter((set) => set.favorite)
      : filter === 3
      ? sets.filter((set) => set.creatorFbId !== fbId)
      : sets;

  return mainFilteredSets;
};

export const combineSetsData = (sets, setsData) => {
  let setsObj = {};
  sets.map((set) => (setsObj[set.setId] = set));

  return setsData.map((set) => ({ ...set, ...setsObj[set._id] }));
};

export const organizeSets = (sets, isByRequested) => {
  const getDate = (set) => (isByRequested ? set.lastRequested : set.createdAt);
  let thisWeekSets = [];
  let notThisWeekSets = [];
  sets.filter((set) => {
    if (!getDate(set)) return false;

    const currentDate = dayjs(new Date()).isoWeek();
    const setDate = dayjs(new Date(getDate(set))).isoWeek();
    if (setDate === currentDate) return thisWeekSets.push(set);

    return notThisWeekSets.push(set);
  });

  return { thisWeekSets, notThisWeekSets };
};

export const searchSets = (sets, search) =>
  sets.filter((set) =>
    new RegExp(search.replaceAll(/[^a-zA-Z\d:]/gi, ""), "ig").test(set.title)
  );
