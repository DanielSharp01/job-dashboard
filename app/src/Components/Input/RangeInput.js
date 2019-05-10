import React, { Fragment } from 'react';
import Textbox from "./Textbox";
import { integers, positiveIntegers, floats, positiveFloats } from "./validation";

export default function RangeInput({ className, from, to, metric, allowFloat, allowNegative }) {
  let validate = allowFloat ? (allowNegative ? floats : positiveFloats) : (allowNegative ? integers : positiveIntegers);
  return (<div className={className}>
    {from && (<Fragment>
      <span>From: </span>
      <Textbox value={0} validate={validate} />
      <span>{metric}</span>
    </Fragment>)}
    {from && to && <span> - </span>}
    {to && (<Fragment>
      <span>To: </span>
      <Textbox value={0} validate={validate} />
      <span>{metric}</span>
    </Fragment>)}
  </div>);
}