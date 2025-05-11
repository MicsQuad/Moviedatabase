import Filter from "../Filter/Filter";

const keyForEmptyLanguageFilter = "None";

function LanguageFilter(props) {
  return (
    <Filter
      labelName="Language"
      value={props.languageFilter}
      setValue={props.setLanguageFilter}
      valueToKey={(value) => value ?? keyForEmptyLanguageFilter}
      keyToValue={(key) =>
        key === keyForEmptyLanguageFilter ? undefined : key
      }
      options={[
        { value: undefined, label: "None" },
        ...props.languages.map((language) => ({
          value: language,
          label: language,
        })),
      ]}
    />
  );
}

export default LanguageFilter;
