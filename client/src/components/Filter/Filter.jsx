import "./Filter.css";

function Filter(props) {
  return (
    <div className="filter-container">
      <label className="filter-label">
        {props.labelName}:
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
      </label>
    </div>
  );
}

export default Filter;
