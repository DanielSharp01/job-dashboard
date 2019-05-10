import React from 'react';
import Dropdown from './Input/Dropdown';

export default function Filter({ properties, selectedProperty, component }) {
  return (<div className="filter">
    <button className="close-button"><i class="fas fa-times"></i></button>
    <div className="property">
      <p>Property:</p>
      <p><Dropdown values={properties} value={selectedProperty} /></p>
    </div>
    <div className="value">
      {component}
    </div>
  </div >);
}