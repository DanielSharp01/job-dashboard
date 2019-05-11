import React, { Fragment } from 'react';
import Textbox from "../Textbox/Textbox";
import { integers, positiveIntegers, floats, positiveFloats } from "../Textbox/validation";
import "./RangeInput.scss";

export default function RangeInput({ from, to, fromValue, toValue, metric, allowFloat, allowNegative, onChange }) {
  let validate = allowFloat ? (allowNegative ? floats : positiveFloats) : (allowNegative ? integers : positiveIntegers);
  return (<form className="range-input">
    {from && (<div className="row">
      <label htmlFor="from">From:</label>
      <Textbox value={fromValue} id="from" validate={validate} onChange={(val) => onChange({ from: val })} />
      <span>{metric}</span>
    </div>)}
    {to && (<div className="row">
      <label htmlFor="to">To:</label>
      <Textbox value={toValue} id="to" validate={validate} onChange={(val) => onChange({ to: val })} />
      <span>{metric}</span>
    </div>)}
  </form>);
}