import React, { createContext, useContext, useState } from "react";

// Search Context
const SearchContext = createContext();
export const useSearch = () => useContext(SearchContext);

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  // Page
  const [page, setPage] = useState(1);
  const prevPage = () =>
    setPage((currentPage) => (currentPage <= 1 ? 1 : currentPage - 1));
  const nextPage = (nextPageNum) =>
    setPage((currentPage) =>
      nextPageNum && nextPageNum !== currentPage ? nextPageNum : currentPage
    );

  // Filters
  const [sortedBy, setSortedBy] = useState(0);
  const [ownedBy, setOwnedBy] = useState(0);
  const sortedByHandler = (value) => {
    setPage(1);
    setSortedBy(value);
  };
  const ownedByHandler = (value) => {
    setPage(1);
    setOwnedBy(value);
  };

  // Sorted By Filter
  const sortedByFilter = {
    label: "Sorted By",
    options: [
      {
        label: "Popularity",
        value: 0,
        onClick: () => sortedByHandler(0),
      },
      {
        label: "Newest",
        value: 1,
        onClick: () => sortedByHandler(1),
      },
      {
        label: "Oldest",
        value: 2,
        onClick: () => sortedByHandler(2),
      },
    ],
  };

  // Owned By Filter
  const ownedByFilter = {
    label: "Owned By",
    options: [
      {
        label: "Anyone",
        value: 0,
        onClick: () => ownedByHandler(0),
      },
      {
        label: "Me",
        value: 1,
        onClick: () => ownedByHandler(1),
      },
      {
        label: "Others",
        value: 2,
        onClick: () => ownedByHandler(2),
      },
    ],
  };

  // Preview
  const [preview, setPreview] = useState({
    setId: null,
    title: "No Set Selected",
    terms: [],
  });
  const resetPreview = () =>
    setPreview({
      setId: null,
      title: "No Set Selected",
      terms: [],
    });

  // Reset
  const resetSearchContext = () => {
    setPage(1);
    setSortedBy(0);
    setOwnedBy(0);
  };

  return (
    <SearchContext.Provider
      value={{
        sortedBy,
        sortedByFilter,
        ownedBy,
        ownedByFilter,
        preview,
        setPreview,
        resetPreview,
        page,
        prevPage,
        nextPage,
        resetSearchContext,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};
