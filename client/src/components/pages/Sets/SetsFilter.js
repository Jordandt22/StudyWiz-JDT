import React, { useEffect, useRef, useState } from "react";

// MUI
import { Box } from "@material-ui/core";

// Contexts
import { useSets } from "../../../context/sets/Sets.context";

// Components
import TabFilter from "./TabFilter";
import MenuFilter from "./MenuFilter";
import SearchBar from "../../templates/SearchBar";

function SetsFilter() {
  const { search, setSearch } = useSets();
  const [initialValues, setValues] = useState({ query: search });

  useEffect(() => {
    if (search !== initialValues.query) {
      setValues({ query: search });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <Box className="sets-filter">
      {/* Main Filter */}
      <TabFilter />

      {/* Secondary Filter */}
      <Box className="row">
        <Box>
          <MenuFilter />
        </Box>

        {/* Sets Search Bar */}
        {initialValues.query === search && (
          <SearchBar
            className="sets-search-bar"
            initialValues={initialValues}
            disabledValidations={{ min: true }}
            callback={(query) => {
              // setSearch(query);
              // setValues({ query });
            }}
            onChange={(e, formikOnChange) => {
              const query = e.target.value;
              setSearch(query);
              setValues({ query });
              formikOnChange(e);
            }}
          />
        )}
      </Box>
    </Box>
  );
}

export default SetsFilter;
