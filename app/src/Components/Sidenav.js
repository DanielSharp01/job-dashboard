import React from 'react';
import FilterList from './FilterList';
import SortList from './SortList';

export default function Sidenav() {
  return <div className="sidenav">
    <FilterList />
    <hr />
    <SortList />
  </div>
}