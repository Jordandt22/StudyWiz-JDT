import React, { createContext, useContext } from "react";

// React Query
import { useQueryClient } from "react-query";

// React Query Context
export const ReactQueryContext = createContext();
export const useReactQuery = () => useContext(ReactQueryContext);

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const queryClient = useQueryClient();

  // Invalidate Query
  const invalidateQuery = (queryKey) => queryClient.invalidateQueries(queryKey);

  return (
    <ReactQueryContext.Provider value={{ queryClient, invalidateQuery }}>
      {props.children}
    </ReactQueryContext.Provider>
  );
};
