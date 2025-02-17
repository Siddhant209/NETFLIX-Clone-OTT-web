import { createContext, useContext } from "react";
import { useState } from "react";

// ✅ Create Context
const MovieContext = createContext();

// ✅ Create a Provider Component
export const MovieProvider = ({ children }) => {
  const [nowPlayingMovieData, setnowPlayingMovieData] = useState({}); 
  const [topRatedMovieData, settopRatedMovieData] = useState({}); 
  const [upcommingMovies,setUpcommingMovies]=useState({});
  const [popularMovies,setPopularMoives]=useState({});
  const [toggle,setToggle]=useState(true);
  const [trailer,setTrailer]=useState(null);
  const [title,setTitle]=useState("")
  const [overview,setoverview]=useState("")
  const[open,setOpen]=useState(false);
  const[id,setId]=useState("");
  return (
    <MovieContext.Provider value={{overview,setoverview,title,setTitle,id,open,nowPlayingMovieData,topRatedMovieData,upcommingMovies,popularMovies,toggle,trailer,setId,setOpen,setTrailer,setToggle, setnowPlayingMovieData,setPopularMoives,setUpcommingMovies,settopRatedMovieData}}>{children}</MovieContext.Provider>
  )
};
// ✅ Custom Hook for easy access
export const useMovieContext = () => {
  return useContext(MovieContext);
};
