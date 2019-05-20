import React from 'react';
import Masonry from 'react-masonry-component';
import JobCard from "../JobCard/JobCard";
import "./JobCards.scss";

export default function JobCards({ jobs, markAsRead }) {
  return <Masonry className="card-grid" options={{ transitionDuration: 0 }} >
    {jobs.map((job) => <JobCard onRead={() => markAsRead(job.id)} key={job.id} {...job} />)}
  </ Masonry>
}