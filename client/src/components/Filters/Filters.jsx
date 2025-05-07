
const optionValueForEmptyGenreFilter = "None"

function Filters(props) {
  return (
    <div id="filter-container">
      <select
        value={genreFilterToOptionValue(props.genreFilter)} 
        onChange={e => props.setGenreFilter(optionValueToGenreFilter(e.target.value))}
      >
        <option value={optionValueForEmptyGenreFilter}>None</option>
        {
          props.genres.map(genre => <option key={genre} value={genre}>{genre}</option>)
        }
      </select>
    </div>
  )
}        

function genreFilterToOptionValue(genreFilter) {
  return genreFilter ?? optionValueForEmptyGenreFilter
}

function optionValueToGenreFilter(optionValue) {
  return optionValue === optionValueForEmptyGenreFilter ? undefined : optionValue
}

export default Filters;
