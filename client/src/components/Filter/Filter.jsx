import "./Filter.css";

function Filter(props) {
  return (
    <div className="filter-container">
      {props.labelName && (
        <label className="filter-label">{props.labelName}:</label>
      )}
      <select
        value={props.valueToKey(props.value)}
        onChange={(e) => props.setValue(props.keyToValue(e.target.value))}
      >
        {props.options.map(({ value, label }) => {
          const key = props.valueToKey(value);
          return (
            <option key={key} value={key}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Filter;
