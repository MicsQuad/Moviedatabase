
// useEffect: allows you to perform side effects in your components
// useState: to keep track of the application state

import React, { useEffect, useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css';

function MovieList(props) {
  
  return (
    <div className="movie-list">
      {props.movies.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;
