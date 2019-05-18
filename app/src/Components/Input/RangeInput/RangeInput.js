import React from 'react';
import Textbox from "../Textbox/Textbox";
import { integers, positiveIntegers, floats, positiveFloats } from "../Textbox/validation";
import "./RangeInput.scss";
import uuidv4 from "uuid/v4";

export default function RangeInput({ from, to, fromValue, toValue, metric, allowFloat, allowNegative, onChange }) {
  let validate = allowFloat ? (allowNegative ? floats : positiveFloats) : (allowNegative ? integers : positiveIntegers);
  let fromUuid = uuidv4() + "_from";
  let toUuid = uuidv4() + "_to";
  return (<form className="range-input">
    {from && (<div className="row">
      <label htmlFor={fromUuid}>From:</label>
      <Textbox value={fromValue} id={fromUuid} validate={validate} onChange={(val) => onChange({ from: val })} />
      <span>{metric}</span>
    </div>)}
    {to && (<div className="row">
      <label htmlFor={toUuid}>To:</label>
      <Textbox value={toValue} id={toUuid} validate={validate} onChange={(val) => onChange({ to: val })} />
      <span>{metric}</span>
    </div>)}
  </form>);
}