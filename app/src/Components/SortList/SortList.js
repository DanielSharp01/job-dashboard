import React from 'react';
import TextSelect from "../Input/TextSelect/TextSelect";
import SortContainer from '../Containers/SortContainer';
import "./SortList.scss";

export default function SortList({
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
  let { saving, saved, modified } = selectedSlot ? slots[selectedSlot] : { saving: false, saved: false, modified: false };
  let slotClassName = "slot" + (saving ? " saving" : saved ? modified ? " modified" : " saved" : "");
  return <div className="sort-list">
    <h2>Order by</h2>
    Slot:
    <div className={slotClassName}>
      <TextSelect entries={Object.keys(slots)} value={addText} id="sort-slots"
        onChange={value => onAddTextChanged(value)}
        onClickChange={value => onSlotChanged(value)} />
      <button disabled={selectedSlot === addText || addText === ""} onClick={() => onSlotAdded()}>
        <i className="fas fa-plus"></i>
      </button>
      <button className="save" disabled={!selectedSlot} onClick={() => selectedSlot && onSlotSaved()}>
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
    {selectedSlot && sortCriteria.map((s, i) => <SortContainer key={s.id} index={i} />)}
    <button className={"add-element"} disabled={!selectedSlot}
      onClick={() => add()}><i className="fas fa-plus-circle"></i></button>
  </div>
}