import Filter from "../Filter/Filter";

const keyForEmptyGenreFilter = "None";

function GenreFilter(props) {
  return (
    <Filter
      labelName="Genre"
      value={props.genreFilter}
      setValue={props.setGenreFilter}
      valueToKey={(value) => value ?? keyForEmptyGenreFilter}
      keyToValue={(key) => (key === keyForEmptyGenreFilter ? undefined : key)}
      options={[
        { value: undefined, label: "None" },
        ...props.genres.map((genre) => ({ value: genre, label: genre })),
      ]}
    />
  );
}

export default GenreFilter;
