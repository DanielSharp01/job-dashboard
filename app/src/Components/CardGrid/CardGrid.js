import React from 'react';
import JobCard from "../JobCard/JobCard";
import "./CardGrid.scss";

export default function CardGrid({ jobs = [
  { name: "C# developer", pay: 1500, tags: ["C#", "Asp.net", "MySQL"], organization: "Müisz", date: "2019.05.02." },
  { name: "Javascript developer", pay: 1800, tags: ["JS", "Express", "Angular", "React", "MySQL"], organization: "Schönherz", date: "2019.05.03." },
] }) {
  return <div className="card-grid">
    {jobs.map((job, i) => <JobCard key={i} {...job} compact={false} />)}
  </div>
}