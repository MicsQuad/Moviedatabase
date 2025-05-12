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
          {!!localStorage.getItem("token") && (
            <button
              className={`bookmark-btn ${isOptionsVisible ? "visible" : ""}`}
              onClick={() => {
                setIsOptionsVisible((previousValue) => !previousValue);
                const user = JSON.parse(localStorage.getItem("user"));
                const dataToSend = {
                  memberId: user.id,
                  movieId: movie._id,
                  status: "to be watched",
                };

                fetch("http://localhost:5000/api/watchlist", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(dataToSend),
                })
                  .then(() => {
                    console.log("success");
                  })
                  .catch(() => {
                    console.log("nah");
                  });
              }}
            >
              {isOptionsVisible ? <FaBookmark /> : <FaRegBookmark />}
            </button>
          )}

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
