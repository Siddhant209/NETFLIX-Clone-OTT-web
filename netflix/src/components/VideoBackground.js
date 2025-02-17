import React, { useEffect } from 'react'
import useMovieById from '../hooks/useMovieById'
import { useMovieContext } from "../context/MovieContext";
function VideoBackground({movieid,bool}) {
  const {trailer,nowPlayingMovieData}=useMovieContext();
  // console.log(nowPlayingMovieData)
  // console.log("hii")
  useMovieById(movieid)
  if (!trailer || !trailer.key) {
    return <p>Loading trailer...</p>; // Show loading message until trailer loads
  }
  // console.log(trailer)
  return (
    <div className='w-[vw] overflow-hidden'>
   <iframe 
   className={bool ? 'w-[100%]': 'w-screen aspect-video'}
   src={`https://www.youtube.com/embed/${trailer.key}?si=qJv9WTG1rH_sTZPZ&autoplay=1&mute=1`} title="YouTube video player" frameborder="0" allowfullscreen></iframe>
    </div>
  )
}

export default VideoBackground