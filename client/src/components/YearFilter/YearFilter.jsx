import Filter from "../Filter/Filter";

const keyForEmptyYearFilter = "None";

function YearFilter(props) {
  return (
    <Filter
      value={props.yearFilter}
      setValue={props.setYearFilter}
      valueToKey={(value) => (value ? value.toString() : keyForEmptyYearFilter)}
      keyToValue={(key) =>
        key === keyForEmptyYearFilter ? undefined : parseInt(key, 10)
      }
      options={[
        { value: undefined, label: "None" },
        ...props.years.map((year) => {
          const yearAsString = year.toString();
          return {
            value: yearAsString,
            label: yearAsString,
          };
        }),
      ]}
    />
  );
}

export default YearFilter;
