import React, { createContext, useContext, useRef, useState } from "react";

// Sets Context
const SetsContext = createContext();
export const useSets = () => useContext(SetsContext);

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  // Sets Search
  const [search, setSearch] = useState("");

  // Filters
  const [filter, setFilter] = useState(0);
  const [sortedBy, setSortedBy] = useState(0);
  const handleSetFilter = (value) => {
    setSearch("");
    setSortedBy(0);
    setFilter(value);
  };

  // Owned By Filter
  const setsFilter = {
    label: "Owned By",
    options: [
      {
        label: "All Sets",
        value: 0,
        onClick: () => handleSetFilter(0),
      },
      {
        label: "My Sets",
        value: 1,
        onClick: () => handleSetFilter(1),
      },
      {
        label: "Favorite Sets",
        value: 2,
        onClick: () => handleSetFilter(2),
      },
      {
        label: "Others' Sets",
        value: 3,
        onClick: () => handleSetFilter(3),
      },
    ],
  };

  // Sorted By Filter
  const sortedByFilter = {
    label: "Sorted By",
    options: [
      {
        label: "Recent",
        value: 0,
        onClick: () => setSortedBy(0),
      },
      {
        label: "Newest",
        value: 1,
        onClick: () => setSortedBy(1),
      },
      {
        label: "Oldest",
        value: 2,
        onClick: () => setSortedBy(2),
      },
    ],
  };

  return (
    <SetsContext.Provider
      value={{
        filter,
        setsFilter,
        sortedBy,
        sortedByFilter,
        search,
        setSearch,
      }}
    >
      {props.children}
    </SetsContext.Provider>
  );
};
