import React from 'react';
import FilterList from '../FilterList/FilterList';
import SortList from '../SortList/SortList';
import "./Sidenav.scss";

export default function Sidenav() {
  return <div className="sidenav">
    <FilterList />
    <hr />
    <SortList />
  </div>
}