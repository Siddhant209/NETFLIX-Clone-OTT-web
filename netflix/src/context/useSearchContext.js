import { createContext, useContext } from "react";
import { useState } from "react";

// ✅ Create Context
const SearchContext = createContext();

// ✅ Create a Provider Component
export const SearchProvider = ({ children }) => {
  
  const [movieName, setMovieName]=useState(false);
  const [SearchedMovie, setSearchedMovie] =useState(null)
  const [loading,setLoading]=useState(false);
  return (
    <SearchContext.Provider value={{movieName,setLoading,loading, setMovieName, SearchedMovie, setSearchedMovie}}>{children}</SearchContext.Provider>
  )
};
// ✅ Custom Hook for easy access
export const useSearchContext = () => {
  return useContext(SearchContext);
};