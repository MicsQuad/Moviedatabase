import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header'; // Import Header component
import MovieList from './components/MovieList/MovieList'; // Import MovieList component
import Filters from './components/Filters/Filters';
import './App.css';

function App() {
  // movies: for the current state
  // setMovies: function that updates the state
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [genreFilter, setGenreFilter] = useState(undefined)

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

  const genres = [...new Set(movies.flatMap(({ genre }) => genre.split(/\s*,\s*/)))].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

  const isSearchTextEmpty = searchText === ""

  // const moviesToDisplay = isSearchTextEmpty ? movies : movies.filter(({title}) => title.toLowerCase().includes(searchText.toLowerCase()))
  let moviesToDisplay = [...movies]
  if (!isSearchTextEmpty) {
    moviesToDisplay = moviesToDisplay.filter(({ title }) => title.toLowerCase().includes(searchText.toLowerCase()))
  }
  if (genreFilter) {
    moviesToDisplay = moviesToDisplay.filter(({ genre }) => genre.includes(genreFilter))
  }

  return (
    <>
    <Header searchText={searchText} setSearchText={setSearchText}/>
    <Filters genres={genres} genreFilter={genreFilter} setGenreFilter={setGenreFilter} />
    <MovieList movies={moviesToDisplay} />
    </>
  )
}

export default App;
