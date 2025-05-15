import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import MovieList from "./components/MovieList/MovieList";
import SearchBar from "./components/SearchBar/SearchBar";
import MovieDetailsFilters from "./components/MovieDetailsFilters/MovieDetailsFilters";
import LibraryFilters from "./components/LibraryFilters/LibraryFilters";
import Accordion from "./components/Accordion/Accordion";
import About from "./components/About/About";
import "./App.css";
import API_BASE_URL from "./config";

function App() {
  const [movies, setMovies] = useState([]);
  const [moviesAreLoaded, setMoviesAreLoaded] = useState(false);
  const [library, setLibrary] = useState(undefined);
  const [searchText, setSearchText] = useState("");
  const [genreFilter, setGenreFilter] = useState(undefined);
  const [yearFilter, setYearFilter] = useState(undefined);
  const [languageFilter, setLanguageFilter] = useState(undefined);
  const [libraryFilter, setLibraryFilter] = useState("no"); // "no" / "inLibraryAll" / "inLibraryWatched" / "inLibraryNotWatched"
  const [showFilters, setShowFilters] = useState("none"); // "none" / "movieDetails" / "libraryStatus"

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/home`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setMoviesAreLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (localStorage.getItem("token")) {
      fetch(`${API_BASE_URL}/api/watchlist/${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setLibrary(
            data.map((entry) => ({
              movieId: entry.movieId._id,
              watched: entry.status === "watched", // to make it boolean
            })),
          );
        })
        .catch((error) => {
          console.error("Error fetching watchlist:", error);
        });
    }
  }, []);

  const addMovieToLibrary = (movieId) => {
    setLibrary([{ movieId, watched: false }, ...library]);

    const user = JSON.parse(localStorage.getItem("user"));
    const dataToSend = {
      memberId: user.id,
      movieId,
      status: "to be watched",
    };

    fetch(`${API_BASE_URL}/api/watchlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    });
  };

  const removeMovieFromLibrary = (movieId) => {
    setLibrary(
      library.filter((libraryEntry) => libraryEntry.movieId !== movieId),
    );

    console.log("removed the movie");

    // ... database
    const user = JSON.parse(localStorage.getItem("user"));

    fetch(`${API_BASE_URL}/api/watchlist`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        memberId: user.id,
        movieId,
      }),
    });
  };

  const setMovieWatchStatusInLibrary = (movieId, watched) => {
    setLibrary(
      library.map((libraryEntry) => {
        if (libraryEntry.movieId == movieId) {
          return { ...libraryEntry, watched };
        } else {
          return libraryEntry;
        }
      }),
    );

    // ... database
    const user = JSON.parse(localStorage.getItem("user"));

    fetch(`${API_BASE_URL}/api/watchlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        memberId: user.id,
        movieId,
        status: watched ? "watched" : "to be watched",
      }),
    });
  };

  const genres = [
    ...new Set(movies.flatMap(({ genre }) => genre.split(/\s*,\s*/))),
  ].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
  const languages = [
    ...new Set(movies.flatMap(({ language }) => language.split(/\s*,\s*/))),
  ].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
  const years = [...new Set(movies.map((movie) => movie.releaseYear))].sort();

  const isSearchTextEmpty = searchText === "";

  let moviesToDisplay = [...movies];
  if (!isSearchTextEmpty) {
    moviesToDisplay = moviesToDisplay.filter(({ title }) =>
      title.toLowerCase().includes(searchText.toLowerCase()),
    );
  }
  if (genreFilter) {
    moviesToDisplay = moviesToDisplay.filter(({ genre }) =>
      genre.includes(genreFilter),
    );
  }
  if (languageFilter) {
    moviesToDisplay = moviesToDisplay.filter(({ language }) =>
      language.includes(languageFilter),
    );
  }
  if (yearFilter) {
    moviesToDisplay = moviesToDisplay.filter(
      ({ releaseYear }) => releaseYear === yearFilter,
    );
  }
  if (library && libraryFilter !== "no") {
    moviesToDisplay = moviesToDisplay.filter(({ _id }) =>
      library.some((libraryEntry) => {
        const idMatches = libraryEntry.movieId === _id;
        const statusMatches =
          libraryFilter === "inLibraryAll" ||
          (libraryFilter === "inLibraryWatched" && libraryEntry.watched) ||
          (libraryFilter === "inLibraryNotWatched" && !libraryEntry.watched);
        return idMatches && statusMatches;
      }),
    );
  }

  const noResults = moviesAreLoaded && moviesToDisplay.length === 0;

  return (
    <>
      <Header />
      <div id="options-wrapper">
        <SearchBar
          value={searchText}
          setValue={setSearchText}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />
      </div>
      <Accordion isOpen={showFilters === "movieDetails"}>
        <MovieDetailsFilters
          genreFilter={genreFilter}
          setGenreFilter={setGenreFilter}
          genres={genres}
          languageFilter={languageFilter}
          setLanguageFilter={setLanguageFilter}
          languages={languages}
          yearFilter={yearFilter}
          setYearFilter={setYearFilter}
          years={years}
        />
      </Accordion>
      <Accordion isOpen={showFilters === "libraryStatus"}>
        <LibraryFilters
          libraryFilter={libraryFilter}
          setLibraryFilter={setLibraryFilter}
        />
      </Accordion>
      <hr></hr>
      {noResults ? (
        <div className="no-results-container">No results</div>
      ) : (
        <MovieList
          movies={moviesToDisplay}
          library={library}
          addMovieToLibrary={addMovieToLibrary}
          removeMovieFromLibrary={removeMovieFromLibrary}
          setMovieWatchStatusInLibrary={setMovieWatchStatusInLibrary}
        />
      )}
    </>
  );
}

export default App;
