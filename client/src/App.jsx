import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import MovieList from "./components/MovieList/MovieList";
import SearchBar from "./components/SearchBar/SearchBar";
import MovieDetailsFilters from "./components/MovieDetailsFilters/MovieDetailsFilters";
import LibraryFilters from "./components/LibraryFilters/LibraryFilters";
import Accordion from "./components/Accordion/Accordion";
import About from "./components/About/About";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [moviesAreLoaded, setMoviesAreLoaded] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [genreFilter, setGenreFilter] = useState(undefined);
  const [yearFilter, setYearFilter] = useState(undefined);
  const [languageFilter, setLanguageFilter] = useState(undefined);
  const [libraryFilter, setLibraryFilter] = useState("no"); // "no" / "inLibraryAll" / "inLibraryWatched" / "inLibraryNotWatched"
  const [showFilters, setShowFilters] = useState("none"); // "none" / "movieDetails" / "libraryStatus"

  useEffect(() => {
    fetch("http://localhost:5000/api/home")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setMoviesAreLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

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

  const noResults = moviesAreLoaded && moviesToDisplay.length === 0;

  return (
    <>
      <Header />
      <About />
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
        <MovieList movies={moviesToDisplay} />
      )}
    </>
  );
}

export default App;
