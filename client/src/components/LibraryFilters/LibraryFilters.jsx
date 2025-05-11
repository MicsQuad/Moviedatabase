import Accordion from "../Accordion/Accordion";
import Filter from "../Filter/Filter";
import "./LibraryFilters.css";

function LibraryFilters(props) {
  return (
    <div className="filters-container">
      <Filter
        value={props.libraryFilter === "no" ? "off" : "on"}
        setValue={(value) =>
          value === "off"
            ? props.setLibraryFilter("no")
            : props.setLibraryFilter("inLibraryAll")
        }
        valueToKey={(value) => value}
        keyToValue={(key) => key}
        options={[
          { value: "off", label: "All movies" },
          { value: "on", label: "My library" },
        ]}
      />
      <Accordion isOpen={props.libraryFilter !== "no"}>
        <Filter
          value={props.libraryFilter}
          setValue={props.setLibraryFilter}
          valueToKey={(value) => value}
          keyToValue={(key) => key}
          options={[
            { value: "inLibraryAll", label: "All" },
            { value: "inLibraryWatched", label: "Watched" },
            { value: "inLibraryNotWatched", label: "Not watched" },
          ]}
        />
      </Accordion>
    </div>
  );
}

export default LibraryFilters;
