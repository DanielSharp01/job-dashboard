import React from 'react';
import JobCard from "../JobCard/JobCard";
import "./JobCards.scss";

export default function JobCards({ jobs }) {
  return <div className="card-grid">
    {jobs.map((job) => <JobCard key={job.id} {...job} compact={false} />)}
  </div>
}