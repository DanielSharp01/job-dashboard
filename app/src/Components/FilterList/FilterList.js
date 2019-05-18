import React from 'react';
import FilterContainer from '../Containers/FilterContainer';
import TextSelect from "../Input/TextSelect/TextSelect";
import "./FilterList.scss";

export default function FilterList({
  filters,
  slots,
  selectedSlot,
  addText,
  add,
  onAddTextChanged,
  onSlotChanged,
  onSlotAdded,
  onSlotRenamed,
  onSlotRemoved,
  onSlotSaved
}) {
  return <div className="filter-list">
    <h2>Filters</h2>
    Slot:
    <div className="slot">
      <TextSelect entries={Object.keys(slots)} value={addText} id="filter-slots"
        onChange={value => onAddTextChanged(value)}
        onClickChange={value => onSlotChanged(value)} />
      <button disabled={selectedSlot === addText || addText === ""} onClick={() => onSlotAdded()}>
        <i className="fas fa-plus"></i>
      </button>
      <button disabled={!selectedSlot} onClick={() => selectedSlot && onSlotSaved()}>
        <i className="fas fa-cloud-upload-alt"></i>
      </button>
      <button disabled={!selectedSlot || selectedSlot === "Notification Filter"}
        onClick={() => onSlotRenamed()}>
        <i className="fas fa-pen"></i>
      </button>
      <button disabled={!selectedSlot || selectedSlot === "Notification Filter"}
        onClick={() => onSlotRemoved()}>
        <i className="fas fa-times"></i>
      </button>
    </div>
    {selectedSlot && filters.map((filter, i) => <FilterContainer key={filter.id} index={i} />)}
    <button className={"add-element"} disabled={!selectedSlot}
      onClick={() => add()}><i className="fas fa-plus-circle"></i></button>
  </div>
}