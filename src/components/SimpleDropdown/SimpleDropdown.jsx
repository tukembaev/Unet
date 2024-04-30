import React, { useRef } from "react";
import { useState  , useEffect} from "react";
import chevron from "./../../assets/icons/chevron.svg"
import "./SimpleDropdown.scss";
const SimpleDropdown = ({selected , setSelected , options , title}) =>{
// states
const [open , setOpen] = useState(false);
const container = useRef(null);
// functions

const handleClickOutside = (event) =>{
  if(container.current && !container.current.contains(event.target)){
    setOpen(false);
  }
}

useEffect(() => {
  const handleDocumentClick = (event) => {
    if (container.current && !container.current.contains(event.target)) {
      handleClickOutside(event);
    }
  };

  document.addEventListener("mousedown", handleDocumentClick);

}, [handleClickOutside]);

return(
    <div className="dropdown" ref={container}>
        <div className="dropdown__header" onClick={() => setOpen(!open)}>
            <p>{selected ? selected : title}</p>
            <img src={chevron} className={`fa fa-chevron-right icon ${open && "open"}`}></img>
        </div>
        <div className={`dropdown__body ${open && "open"}`}>
        {options.map((option) =>(
            <div className="dropdown__item" onClick={() =>{setSelected(option); setOpen(false)}}>
              {option}
            </div>
          ))}
        </div>
    </div>
)
}

export default SimpleDropdown