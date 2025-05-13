import React from "react";
import "./MovieCard.css";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useState } from "react";

function MovieCard({
  movie,
  showLibraryButtons,
  isInLibrary,
  watched,
  setWatched,
  addToLibrary,
  removeFromLibrary,
}) {
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
          {showLibraryButtons && (
            <button
              className={`bookmark-btn ${isInLibrary ? "visible" : ""}`}
              onClick={() => {
                if (isInLibrary) {
                  removeFromLibrary();
                } else {
                  addToLibrary();
                }
              }}
            >
              {isInLibrary ? <FaBookmark /> : <FaRegBookmark />}
            </button>
          )}

          {isInLibrary && (
            <div className="watched-options-container">
              <select
                className="watched-options"
                value={watched ? "watched" : "not_watched"}
                onChange={(e) => setWatched(e.target.value === "watched")}
              >
                <option value="not_watched">Not Watched</option>
                <option value="watched">Watched</option>
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
