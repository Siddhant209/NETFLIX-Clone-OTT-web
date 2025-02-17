import axios from 'axios';
import React, { useState } from 'react'
import { useSearchContext } from '../context/useSearchContext';
import MovieList from "./MovieList";

function SearchMovie() {
  const {SearchedMovie,setSearchedMovie,setMovieName,movieName,setLoading,loading} = useSearchContext();
  const [SearchMovie, setSearchMovie] = useState("");

  const submitHandler = async(e) => {
    e.preventDefault();
   setMovieName(SearchMovie);
   console.log(movieName);
    const search_url=`https://api.themoviedb.org/3/search/movie?query=${SearchMovie}&include_adult=false&language=en-US&page=1`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2Y1MjU2NjRkMjZlMDNjYTIyZWYwNzU1MjEwMWZiMyIsIm5iZiI6MTczODY1MTY2Ny4zNDIwMDAyLCJzdWIiOiI2N2ExYjgxM2JlYjhmZmVlODUyNjRjYTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.t94VZhgKywGp5aY7BXxfPX1ueMEtYhLnB-7Og-eXH9U'
      }
    };
    
    try{
      setLoading(true);
      const res= await axios.get(search_url,options);
      setSearchedMovie(res.data.results)
      console.log(SearchedMovie);
     setLoading(false);
     setSearchMovie("")
    }catch(error){
      console.log(error)
    }
  }
  return (
    <div>
      <div className='flex justify-center pt-[10%] w-[100%]'>
        <form onSubmit={submitHandler} className='w-[50%]'>
          <div className='flex justify-between shadow-md border-2 p-2 border-gray-200 rounded-lg w-[100%]'>
            <input value={SearchMovie} onChange={(e) => {setSearchMovie(e.target.value)}} className='w-full outline-none runded-md text-lg' type='text' placeholder='Search Movies...' />
            <button className='bg-red-800 text-white rounded-md px-4 py-2'>{loading ? "Loading...":"Search"}</button>
          </div>
        </form>
      </div>
      <MovieList title={movieName} movie={SearchedMovie} />
    </div>
  )
}

export default SearchMovie