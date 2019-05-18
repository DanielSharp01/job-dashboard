import React from 'react';
import TextSelect from "../Input/TextSelect/TextSelect";
import SortContainer from '../Containers/SortContainer';
import "./SortList.scss";

export default function FilterList({
  sortCriteria,
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
  return <div className="sort-list">
    <h2>Order by</h2>
    Slot:
    <div className="slot">
      <TextSelect entries={Object.keys(slots)} value={addText} id="sort-slots"
        onChange={value => onAddTextChanged(value)}
        onClickChange={value => onSlotChanged(value)} />
      <button className={selectedSlot === addText || addText === "" ? "disabled" : ""} onClick={() => onSlotAdded()}>
        <i className="fas fa-plus"></i>
      </button>
      <button className={!selectedSlot ? "disabled" : ""} onClick={() => onSlotSaved()}>
        <i className="fas fa-cloud-upload-alt"></i>
      </button>
      <button className={!selectedSlot ? "disabled" : ""} onClick={() => onSlotRenamed()}>
        <i className="fas fa-pen"></i>
      </button>
      <button className={!selectedSlot ? "disabled" : ""} onClick={() => onSlotRemoved()}>
        <i className="fas fa-times"></i>
      </button>
    </div>
    {selectedSlot && sortCriteria.map((s, i) => <SortContainer key={s.id} index={i} />)}
    <button className={"add-element" + (!selectedSlot ? " disabled" : "")}
      onClick={() => add()}><i className="fas fa-plus-circle"></i></button>
  </div>
}