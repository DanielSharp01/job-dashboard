import React from 'react';
import SortListContainer from '../Containers/SortListContainer';
import "./Sidenav.scss";
import FilterListContainer from '../Containers/FilterListContainer';

export default function Sidenav() {
  return <div className="sidenav">
    <FilterListContainer />
    <hr />
    <SortListContainer />
  </div>
}