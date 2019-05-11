import React from 'react';
import Dropdown from '../Input/Dropdown/Dropdown';
import RadioButtons from "../Input/RadioButtons/RadioButtons";
import "./SortCriteria.scss";

export default function SortCriteria({ properties, selectedProperty, direction, upButton = true, downButton = true }) {
  return (<div className="sort-criteria">
    <div className="buttons">
      <button className="close-button"><i className="fas fa-times"></i></button>
      <button className="move-button" disabled={!upButton}><i className="fas fa-sort-up"></i></button>
      <button className="move-button" disabled={!downButton}><i className="fas fa-sort-down"></i></button>
    </div>
    <div className="property">
      <p><span>Property:</span></p>
      <p><Dropdown values={properties} value={selectedProperty} /></p>
    </div>
    <div className="direction">
      <p>Direction:</p>
      <p><RadioButtons
        value={direction}
        values={["Asc", "Desc"]} /></p>
    </div>
  </div >);
}