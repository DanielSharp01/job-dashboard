import React from 'react';
import Dropdown from './Input/Dropdown';
import RadioButtons from "./Input/RadioButtons";

export default function SortCriteria({ properties }) {
  return (<div className="sort-criteria">
    <button className="close-button">x</button>
    <button className="move-up-button">↑</button>
    <button className="move-down-button">↓</button>
    <div className="property">
      <span>Property:</span>
      <Dropdown values={properties.map((p, i) => ({ key: i, value: p }))} value={0} />
    </div>
    <div className="direction">
      <span>Direction:</span>
      <RadioButtons name="sort-direction"
        value="asc"
        values={[{ key: "asc", value: "Asc" }, { key: "desc", value: "Desc" }]} />
    </div>
  </div >);
}