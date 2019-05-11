import React from 'react';
import "./FilterList.scss";
import FilterContainer from '../Containers/FilterContainer';

export default function FilterList({ filters, add }) {
  return <div className="filter-list">
    <h2>Filters</h2>
    {filters.map((filter, i) => <FilterContainer key={filter.id} index={i} />)}
    <button className="add-element" onClick={() => add()}><i className="fas fa-plus-circle"></i></button>
  </div>
}