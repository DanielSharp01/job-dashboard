import React from 'react';
import Dropdown from './Input/Dropdown';

export default function Filter({ properties, component }) {
  return (<div className="filter">
    <button className="close-button">x</button>
    <div className="property">
      <span>Property:</span>
      <Dropdown values={properties.map((p, i) => ({ key: i, value: p }))} value={0} />
    </div>
    <div className="value">
      {component}
    </div>
  </div >);
}