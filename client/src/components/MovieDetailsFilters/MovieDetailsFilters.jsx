import GenreFilter from "../GenreFilter/GenreFilter";
import LanguageFilter from "../LanguageFilter/LanguageFilter";
import YearFilter from "../YearFilter/YearFilter";
import "./MovieDetailsFilters.css";

function MovieDetailsFilters(props) {
  return (
    <div className="filters-container">
      <p>Filters</p>
      <div className="filters-list">
        <GenreFilter
          genreFilter={props.genreFilter}
          setGenreFilter={props.setGenreFilter}
          genres={props.genres}
        />
        <LanguageFilter
          languageFilter={props.languageFilter}
          setLanguageFilter={props.setLanguageFilter}
          languages={props.languages}
        />
        <YearFilter
          yearFilter={props.yearFilter}
          setYearFilter={props.setYearFilter}
          years={props.years}
        />
      </div>
    </div>
  );
}

export default MovieDetailsFilters;
