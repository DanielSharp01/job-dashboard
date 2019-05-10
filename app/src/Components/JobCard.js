import React from 'react';

export default function JobCard({ name, pay, tags, organization, date, compact }) {
  return <div className={"job-card" + (compact ? " compact" : "")}>
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
      <div className="organization">{organization}</div>
      <span className="date">{date}</span>
    </div>
  </div>
}