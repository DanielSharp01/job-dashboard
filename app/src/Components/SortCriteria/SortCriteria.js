import React from 'react';
import "./SortCriteria.scss";
import sortCriteria from '../../Reducers/sortCriteria';

export default function SortCriteria({
  properties,
  property,
  direction,
  changeProperty,
  changeDirection,
  move,
  remove,
  upButton = true,
  downButton = true }) {
  return (<div className="sort-criteria">
    <div className="buttons">
      <button className="close-button" onClick={() => remove()}><i className="fas fa-times"></i></button>
      <button className="move-button" disabled={!upButton} onClick={() => move("up")}>
        <i className="fas fa-sort-up"></i>
      </button>
      <button className="move-button" disabled={!downButton} onClick={() => move("down")}>
        <i className="fas fa-sort-down"></i>
      </button>
    </div>
    <div className="property">
      <p><span>Property:</span></p>
      <p>
        <select value={property} onChange={(e) => changeProperty(e.target.value)}>
          {properties.map(p => (<option key={p} value={p}>{p}</option>))}
        </select>
      </p>
    </div>
    <div className="direction">
      <p>Direction:</p>
      <p>
        <label>
          <input type="radio"
            value={"Asc"}
            name={sortCriteria.id}
            checked={direction === "Asc"}
            onChange={() => changeDirection("Asc")} />
          Asc
        </label>
        <label>
          <input type="radio"
            value={"Desc"}
            name={sortCriteria.id}
            checked={direction === "Desc"}
            onChange={() => changeDirection("Desc")} />
          Desc
        </label>
      </p>
    </div>
  </div >);
}