export const sortSetsByRecent = (sets) =>
  sets.sort((a, b) => new Date(a.lastRequested) - new Date(b.lastRequested));
