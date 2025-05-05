
// useEffect: allows you to perform side effects in your components
// useState: to keep track of the application state

import React, { useEffect, useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css';

function MovieList() {
  // movies: for the current state
  // setMovies: function that updates the state
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/home')
      .then((res) => res.json())
      .then((data) => {
        setMovies(data); // update the state
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }, []); // runs only on the first render

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;
