import GenreFilter from "../GenreFilter/GenreFilter";
import LanguageFilter from "../LanguageFilter/LanguageFilter";
import YearFilter from "../YearFilter/YearFilter";

function Filters(props) {
  return (
    <div>
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
  );
}

export default Filters;
