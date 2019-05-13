import React from 'react';
import Masonry from 'react-masonry-component';
import JobCard from "../JobCard/JobCard";
import "./JobCards.scss";

export default function JobCards({ jobs }) {
  return <Masonry className="card-grid" options={{ transitionDuration: 0 }} >
    {jobs.map((job) => <JobCard key={job.id} {...job} compact={false} />)}
  </ Masonry>
}