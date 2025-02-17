// src/components/MovieContainer.js
import React from "react";
import MovieList from "./MovieList";
import { useMovieContext } from "../context/MovieContext";




const MovieContainer = () => {
  const {nowPlayingMovieData,topRatedMovieData,upcomingMovies, popularMovies } =useMovieContext();


  return (
    
    <div className="bg-black">
      <div className="-mt-52 relative z-10">
      {/* <MovieList title ={"Popular Movie"} movie ={popularMovies} /> */}
      <MovieList title ={"Now Playing Movie"} movie ={nowPlayingMovieData}/>
      {/* <MovieList title ={"Top rated Movie"} movie ={topRatedMovieData}/> */}
      {/* <MovieList title={"Upcoming Movie"}movie ={upcomingMovies} /> */}
      </div>
    </div>
  );
};

export default MovieContainer;