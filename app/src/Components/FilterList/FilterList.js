import React from 'react';
import Filter from "../Filter/Filter";
import CheckListInput from "../Input/CheckListInput/CheckListInput";
import RangeInput from "../Input/RangeInput/RangeInput";
import "./FilterList.scss";

export default function FilterList({ filters = [
  {
    properties: ["Tags", "Pay", "Hours"], selectedProperty: "Tags",
    component: <CheckListInput list={["C#", "Asp.net"]} fixed={false} />
  },
  {
    properties: ["Tags", "Pay", "Hours"], selectedProperty: "Pay",
    component: <RangeInput from={true} to={true} allowNegative={false} allowFloat={false} />
  },
] }) {
  return <div className="filter-list">
    <h2>Filters</h2>
    {filters.map((filter, i) => <Filter key={i} {...filter} />)}
    <button className="add-element"><i className="fas fa-plus-circle"></i></button>
  </div>
}