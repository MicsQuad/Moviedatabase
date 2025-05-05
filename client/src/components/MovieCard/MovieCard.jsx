import React from 'react';

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <h3>{movie.title}</h3>
      <p>{movie.description}</p>
      {/* Add more fields depending on your schema */}
    </div>
  );
}

export default MovieCard;
