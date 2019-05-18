import React, { Fragment } from 'react';
import DateRangeInput from "../Input/DateRangeInput/DateRangeInput";
import RangeInput from "../Input/RangeInput/RangeInput";
import Textbox from "../Input/Textbox/Textbox";
import CheckListInput from '../Input/CheckListInput/CheckListInput';
import filterClassMap from "../../Filters/filterMapping";
import "./Filter.scss";

export default function Filter(props) {
  const { properties, property, changeProperty, remove } = props;
  return (<div className="filter">
    <button className="close-button" onClick={remove}><i className="fas fa-times"></i></button>
    <div className="property">
      <p>Property:</p>
      <select value={property} onChange={(e) => changeProperty(e.target.value)}>
        {properties.map(p => (<option key={p} value={p}>{p}</option>))}
      </select>
    </div>
    <div className="value">
      {
        filterClassMap[property].type === "RANGE" &&
        (filterClassMap[property].rangeType === "INTEGER" || filterClassMap[property].rangeType === "NUMBER") &&
        <RangeInput
          from={filterClassMap[property].from.enabled}
          to={filterClassMap[property].to.enabled}
          fromValue={props.from}
          toValue={props.to}
          metric={filterClassMap[property].metric}
          allowFloat={filterClassMap[property].rangeType === "NUMBER"}
          allowNegative={filterClassMap[property].allowNegative}
          onChange={props.onRangeChange} />
      }
      {
        filterClassMap[property].type === "RANGE" && filterClassMap[property].rangeType === "DATE" &&
        <DateRangeInput
          from={filterClassMap[property].from.enabled}
          to={filterClassMap[property].to.enabled}
          fromValue={props.from}
          toValue={props.to}
          onChange={props.onRangeChange} />
      }
      {
        filterClassMap[property].type === "LIST" && filterClassMap[property].includeTypes.length > 1 &&
        <select value={props.includeType} onChange={(e) => props.changeIncludeType(e.target.value)}>
          {filterClassMap[property].includeTypes.map(v => {
            let vspl = v.split("-");
            return <option key={v} value={v}>Include {vspl[0] + (vspl.length > 1 ? ` (unchecked ${vspl[1]})` : "")}</option>;
          })
          }
        </select>
      }
      {
        filterClassMap[property].type === "LIST" &&
        <CheckListInput
          fixed={filterClassMap[property].fixed}
          list={props.entries.map((v, i) => ({ ...v, index: i }))}
          onAdd={props.onListAdd}
          onChecked={props.onListChecked}
          onRemove={props.onListRemove}
        />
      }
      {
        filterClassMap[property].type === "STRING" &&
        <Textbox value={props.string} onChange={(val) => props.onStringChange(val)} />
      }
      {
        (filterClassMap[property].type === "STRING" ||
          (filterClassMap[property].type === "LIST" && !filterClassMap[property].fixed)) &&
        <Fragment>
          <label>
            <input type="checkbox" checked={props.matchCase} onChange={() => props.onMatchCaseChange(!props.matchCase)} />
            Match case
          </label>
          <label>
            <input type="checkbox" checked={props.wholeWord} onChange={() => props.onWholeWordChange(!props.wholeWord)} />
            Whole word
          </label>
          <label>
            <input type="checkbox" checked={props.regex} onChange={() => props.onRegexChange(!props.regex)} />
            Regex
          </label>
        </Fragment>
      }
    </div>
  </div >);
}