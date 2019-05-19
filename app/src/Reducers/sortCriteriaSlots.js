import {
  RECIEVE_SORT_CRITERIA_SLOTS,
  ADD_SORT_CRITERIA_SLOT,
  CHANGE_SORT_CRITERIA_SLOT_ADD_TEXT,
  CHANGE_SORT_CRITERIA_SLOT,
  RENAME_SORT_CRITERIA_SLOT,
  REMOVE_SORT_CRITERIA_SLOT,
  SAVING_SORT_CRITERIA_SLOT,
  SAVED_SORT_CRITERIA_SLOT,

  ADD_SORT_CRITERIA,
  CHANGE_SORT_CRITERIA_PROPERTY,
  CHANGE_SORT_CRITERIA_DIRECTION,
  MOVE_SORT_CRITERIA,
  REMOVE_SORT_CRITERIA
} from "../Actions";

import sortCriteria from "./sortCriteria";

export default (state = {
  addText: "",
  selectedSlot: null,
  slots: {}
}, action) => {
  let newSlots, slot, newSelectedSlot;
  switch (action.type) {
    case RECIEVE_SORT_CRITERIA_SLOTS:
      let actionSlots = action.slots.reduce((acc, slot) => {
        acc[slot.name] = { sortCriteria: slot.content, saving: false, saved: true, modified: false };
        return acc;
      }, {});
      newSelectedSlot = (state.selectedSlot === null) ? Object.keys(actionSlots)[0] : state.selectedSlot;
      return Object.assign({ ...state }, {
        slots: { ...state.slots, ...actionSlots },
        selectedSlot: newSelectedSlot,
        addText: newSelectedSlot
      });
    case ADD_SORT_CRITERIA_SLOT:
      if (state.addText === state.selectedSlot) return state;
      return Object.assign({ ...state }, {
        selectedSlot: state.addText, slots:
          { ...state.slots, [state.addText]: { sortCriteria: [], saving: false, saved: false, modified: false } }
      });
    case CHANGE_SORT_CRITERIA_SLOT_ADD_TEXT:
      return Object.assign({ ...state }, { addText: action.text });
    case CHANGE_SORT_CRITERIA_SLOT:
      return Object.assign({ ...state }, { selectedSlot: action.name, addText: action.name });
    case RENAME_SORT_CRITERIA_SLOT:
      newSlots = { ...state.slots };
      slot = newSlots[state.selectedSlot];
      delete newSlots[state.selectedSlot];
      newSlots[state.addText] = slot;

      return Object.assign({ ...state }, {
        selectedSlot: state.addText,
        slots: newSlots
      });
    case REMOVE_SORT_CRITERIA_SLOT:
      newSlots = { ...state.slots };
      delete newSlots[state.selectedSlot];
      newSelectedSlot = Object.keys(newSlots)[0] || null;
      return Object.assign({ ...state }, {
        selectedSlot: newSelectedSlot,
        addText: newSelectedSlot || "",
        slots: newSlots
      });
    case SAVING_SORT_CRITERIA_SLOT:
      slot = Object.assign({ ...state.slots[state.selectedSlot] }, { saving: true });
      return Object.assign({ ...state }, {
        slots: Object.assign({ ...state.slots }, { [state.selectedSlot]: slot })
      });
    case SAVED_SORT_CRITERIA_SLOT:
      let prevSaved = state.slots[state.selectedSlot].saved;
      let prevModified = state.slots[state.selectedSlot].modified;
      slot = Object.assign({ ...state.slots[state.selectedSlot] },
        { saving: false, saved: action.success || prevSaved, modified: !action.success && prevModified });
      return Object.assign({ ...state }, {
        slots: Object.assign({ ...state.slots }, { [state.selectedSlot]: slot })
      });
    case ADD_SORT_CRITERIA:
    case CHANGE_SORT_CRITERIA_PROPERTY:
    case CHANGE_SORT_CRITERIA_DIRECTION:
    case MOVE_SORT_CRITERIA:
    case REMOVE_SORT_CRITERIA:
      newSlots = { ...state.slots };
      if (state.selectedSlot) {
        newSlots[state.selectedSlot].sortCriteria = sortCriteria(newSlots[state.selectedSlot].sortCriteria, action);
        newSlots[state.selectedSlot].modified = true;
      }
      return Object.assign({ ...state }, { slots: newSlots });
    default:
      return state;
  }
}

export function getSortCriteria({ slots, selectedSlot }) {
  return slots[selectedSlot] && slots[selectedSlot].sortCriteria;
}