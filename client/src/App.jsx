import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header'; // Import Header component
import MovieList from './components/MovieList/MovieList'; // Import MovieList component
import './App.css';

function App() {
  // movies: for the current state
  // setMovies: function that updates the state
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");

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

  const isSearchEmpty = searchText === ""

  const moviesToDisplay = isSearchEmpty ? movies : movies.filter(({title}) => title.toLowerCase().includes(searchText.toLowerCase()))

  return (
    <>
    <Header searchText={searchText} setSearchText={setSearchText}/>
    <MovieList movies={moviesToDisplay} />
    </>
  )
}

export default App;
