import React from 'react';
import "./JobCard.scss";
import moment from "moment";

export default function JobCard({ name, link, pay, tags, organization, hours, date, compact }) {
  let hoursClass = (!hours || (!hours.min && hours.min !== 0)) ? "gray" :
    hours.min <= 15 ? "green" :
      hours.min <= 20 ? "yellow" :
        hours.min <= 25 ? "orange" : "red";

  let payText = pay ? `${pay.min}${(pay.min && pay.max) ? "-" : ""}${pay.max || ""} Ft/hr` : "unknown pay";

  return <div className={`job-card ${(compact ? " compact" : "")}`} onClick={() => window.open(link)}>
    <div className="top-wrapper">
      <div className="header">
        <div className="name">{name}</div>
        <div className="pay">{payText}</div>
      </div>
      <div className="tags">
        {tags.map((tag, i) => (<div key={i} className="tag">{tag}</div>))}
      </div>
    </div>
    <div className="footer">
      <div className="footer-wrapper">
        <div className="organization">{organization}</div>
        {(hours && (hours.min || hours.max)) && <div className={`hours ${hoursClass}`}>
          {hours.min !== 0 && !hours.min ? "?" : hours.min}-{hours.max !== 0 && !hours.max ? "?" : hours.max} hrs
        </div>}
      </div>
      <span className="date">{moment(date).format("YYYY.MM.DD.")}</span>
    </div>
  </div>
}