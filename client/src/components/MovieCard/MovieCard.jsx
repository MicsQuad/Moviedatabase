import React from "react";
import "./MovieCard.css";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useState } from "react";

function MovieCard({ movie }) {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  return (
    <div className="movie-card">
      <img
        className="movie-poster"
        src={movie.posterUrl}
        alt={`${movie.title} poster`}
      />
      <div className="movie-details">
        <h3 className="movie-title">{movie.title}</h3>
        <p>Genre: {movie.genre}</p>
        <p>Year: {movie.releaseYear}</p>
        <p>Language: {movie.language}</p>
        <p className="movie-description">{movie.description}</p>
        <div className="watched-container">
          <button
            className={`bookmark-btn ${isOptionsVisible ? "visible" : ""}`}
            onClick={() => {
              setIsOptionsVisible((previousValue) => !previousValue);
            }}
          >
            {isOptionsVisible ? <FaBookmark /> : <FaRegBookmark />}
          </button>
          {isOptionsVisible && (
            <div className="watched-options-container">
              <select className="watched-options">
                <option value="Not watched">Not Watched</option>
                <option value="Watched">Watched</option>
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
