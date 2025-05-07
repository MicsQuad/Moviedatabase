import React from 'react';
import './MovieCard.css';

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img className='movie-poster' src={movie.posterUrl} alt={`${movie.title} poster`} />
      <div className="movie-details">
        <h3 className='movie-title'>{movie.title}</h3>
        <p>Genre: {movie.genre}</p>
        <p>Year: {movie.releaseYear}</p>
        <p>Language: {movie.language}</p>
        <p className="movie-description">{movie.description}</p>
      </div>
    </div>
  );
}

export default MovieCard;
