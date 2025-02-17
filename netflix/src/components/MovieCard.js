import React from 'react'
import { useMovieContext } from '../context/MovieContext';
const MovieCard = ({posterPath,movieId}) => {
  const {setOpen,setId,setoverview,setTitle,nowPlayingMovieData}=useMovieContext();
  const handleOpen =()=>{
   setOpen(true);
   setId(movieId);
   if(!nowPlayingMovieData){
    return
  }else{
    const data =nowPlayingMovieData.map((items)=>{
      return items;
    })
    const newData = data.filter(item=>
      item.id === movieId
    )
    setTitle(newData[0].title)
    setoverview(newData[0].overview)
  }
  }
  if(posterPath == null) return null;
  return (
    <div className='w-48 pr-2' onClick={handleOpen}>
      <img src={`https://image.tmdb.org/t/p/w500/${posterPath}`} alt="movie_banner" />
    </div>
  )
}

export default MovieCard