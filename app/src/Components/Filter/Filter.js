import React from 'react';
import RangeInput from "../Input/RangeInput/RangeInput"
import "./Filter.scss";
import CheckListInput from '../Input/CheckListInput/CheckListInput';

export default function Filter(props) {
  const { properties, property, changeProperty, remove, type } = props;
  return (<div className="filter">
    <button className="close-button" onClick={remove}><i className="fas fa-times"></i></button>
    <div className="property">
      <p>Property:</p>
      <p>
        <select value={property} onChange={(e) => changeProperty(e.target.value)}>
          {properties.map(p => (<option key={p} value={p}>{p}</option>))}
        </select>
      </p>
    </div>
    <div className="value">
      {
        type === "range" &&
        <RangeInput
          from={props.from}
          to={props.to}
          fromValue={props.fromValue}
          toValue={props.toValue}
          metric={props.metric}
          allowFloat={props.allowFloat}
          allowNegative={props.allowNegative}
          onChange={props.onRangeChange} />
      }
      {
        type === "list" &&
        <CheckListInput
          fixed={props.fixed}
          list={props.values.map((v, i) => ({ ...v, index: i }))}
          onAdd={props.onListAdd}
          onChecked={props.onListChecked}
          onRemove={props.onListRemove}
        />
      }
    </div>
  </div >);
}