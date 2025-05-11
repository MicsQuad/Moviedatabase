import "./Accordion.css";

function Accordion(props) {
  return (
    <div className={"accordion " + (props.isOpen ? "is-open" : "")}>
      {props.children}
    </div>
  );
}

export default Accordion;
