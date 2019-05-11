import React, { Fragment } from 'react';
import Textbox from "../Textbox/Textbox";
import { integers, positiveIntegers, floats, positiveFloats } from "../Textbox/validation";
import "./RangeInput.scss";

export default function RangeInput({ from, to, metric, allowFloat, allowNegative }) {
  let validate = allowFloat ? (allowNegative ? floats : positiveFloats) : (allowNegative ? integers : positiveIntegers);
  return (<div className="range-input">
    {from && (<Fragment>
      <span>From: </span>
      <Textbox value={0} validate={validate} />
      <span>{metric}</span>
    </Fragment>)}
    {from && to && <span className="middle"> - </span>}
    {to && (<Fragment>
      <span>To: </span>
      <Textbox value={0} validate={validate} />
      <span>{metric}</span>
    </Fragment>)}
  </div>);
}