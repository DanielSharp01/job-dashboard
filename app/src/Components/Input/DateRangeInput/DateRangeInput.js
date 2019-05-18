import React from 'react';
import Textbox from "../Textbox/Textbox";
import { date } from "../Textbox/validation";
import "./DateRangeInput.scss";
import uuidv4 from "uuid/v4";

export default function DateRangeInput({ from, to, fromValue, toValue, onChange }) {
  let fromUuid = uuidv4() + "_from";
  let toUuid = uuidv4() + "_to";
  return (<form className="range-input">
    {from && (<div className="row">
      <label htmlFor={fromUuid}>From:</label>
      <Textbox value={fromValue} id={fromUuid} softValidate={date} onChange={(val) => onChange({ from: val })} />
    </div>)}
    {to && (<div className="row">
      <label htmlFor={toUuid}>To:</label>
      <Textbox value={toValue} id={toUuid} softValidate={date} onChange={(val) => onChange({ to: val })} />
    </div>)}
  </form>);
}