import React from 'react'
import MovieCard from './MovieCard';

const movieList =({title, movie=[]}) => {
  
  return (
    <div className='px-8'>
      <h1 className='text-3xl'>{title}</h1>
      <div className='overflow-x-auto no-scrollbar cursor-pointer flex'>
        <div className='flex items-center'>
        {
  Array.isArray(movie) ? movie.map((movie) => (
    <MovieCard key={movie.id} movieId={movie.id} posterPath={movie.poster_path} />
  )) : <p>No movies available</p>
}

        </div>
      </div>
    </div>
  )
}

export default movieList