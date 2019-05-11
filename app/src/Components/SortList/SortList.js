import React from 'react';
import "./SortList.scss";
import SortContainer from '../Containers/SortContainer';

export default function SortList({ sortCriteria, add }) {
  return <div className="sort-list">
    <h2>Order by</h2>
    {sortCriteria.map((s, i) =>
      <SortContainer
        key={s.id}
        index={i} />)}
    <button className="add-element" onClick={() => add()}><i className="fas fa-plus-circle"></i></button>
  </div>
}