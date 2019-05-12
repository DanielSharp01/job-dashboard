import React from 'react';
import "./JobCard.scss";
import moment from "moment";

export default function JobCard({ name, pay, tags, organization, minHours, maxHours, date, compact }) {
  let hoursClass = (!minHours && minHours !== 0) ? "gray" :
    minHours <= 15 ? "green" :
      minHours <= 20 ? "yellow" :
        minHours <= 25 ? "orange" : "red";

  return <div className={`job-card ${(compact ? " compact" : "")}`}>
    <div className="top-wrapper">
      <div className="header">
        <div className="name">{name}</div>
        <div className="pay">{pay + "Ft/hr"}</div>
      </div>
      <div className="tags">
        {tags.map((tag, i) => (<div key={i} className="tag">{tag}</div>))}
      </div>
    </div>
    <div className="footer">
      <div className="footer-wrapper">
        <div className="organization">{organization}</div>
        {(minHours || maxHours) && <div className={`hours ${hoursClass}`}>
          {minHours !== 0 && !minHours ? "?" : minHours}-{maxHours !== 0 && !maxHours ? "?" : maxHours} hrs
        </div>}
      </div>
      <span className="date">{moment(date).format("YYYY.MM.DD.")}</span>
    </div>
  </div>
}