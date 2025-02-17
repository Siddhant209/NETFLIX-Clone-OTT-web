import { useNavigate } from "react-router-dom";
import { useFormContext } from "../context/FormContext";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import { useEffect } from "react";
import { useMovieContext } from "../context/MovieContext";
import axios from "axios";
import MovieContainer from "./MovieContainer";
import SearchMovie from "./SearchMovie"

import MainContainer from "./MainContainer";
function Browser() {
    const navigate = useNavigate();
    const { formData } = useFormContext();
    const {toggle}=useMovieContext();
  const user = formData.user;

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user,navigate]);
  useNowPlayingMovies();
  return (
    <div>
      {
        toggle ?  
        <div>
          <MainContainer />
          <MovieContainer/>
        </div>
        :<SearchMovie />
      }
    </div>
  );
}

export default Browser;
