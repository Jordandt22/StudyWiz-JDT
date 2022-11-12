// Favorite Set / Term
export const favoriteFeatureHandler = (
  { user, dataSent: { fbId, setId } },
  { setSets, invalidateQuery }
) => {
  setSets(user.sets);
  invalidateQuery(`${fbId}_SET_SETID:${setId}`);
};
