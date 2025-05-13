import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieList.css";

function MovieList(props) {
  const showLibraryButtons = localStorage.getItem("token");

  return (
    <div className="movie-list">
      {props.movies.map((movie) => {
        const libraryEntry =
          props.library &&
          props.library.find(
            (libraryEntry) => libraryEntry.movieId == movie._id,
          );

        return (
          <MovieCard
            key={movie._id}
            movie={movie}
            showLibraryButtons={showLibraryButtons}
            isInLibrary={libraryEntry !== undefined}
            watched={libraryEntry && libraryEntry.watched}
            setWatched={(watched) =>
              props.setMovieWatchStatusInLibrary(movie._id, watched)
            }
            addToLibrary={() => props.addMovieToLibrary(movie._id)}
            removeFromLibrary={() => props.removeMovieFromLibrary(movie._id)}
          />
        );
      })}
    </div>
  );
}

export default MovieList;
