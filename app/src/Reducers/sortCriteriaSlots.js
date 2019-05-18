import {
  RECIEVE_SORT_CRITERIA_SLOTS,
  ADD_SORT_CRITERIA_SLOT,
  CHANGE_SORT_CRITERIA_SLOT_ADD_TEXT,
  CHANGE_SORT_CRITERIA_SLOT,
  RENAME_SORT_CRITERIA_SLOT,
  REMOVE_SORT_CRITERIA_SLOT,
  SAVING_SORT_CRITERIA_SLOT,
  SAVED_SORT_CRITERIA_SLOT,
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
      let actionSlots = Object.keys(action.slots).reduce((acc, key) => {
        acc[key] = { sortCriteria: action.slots[key], saving: false };
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
          { ...state.slots, [state.addText]: { sortCriteria: [], saving: false } }
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
      slot = Object.assign({ ...state.slots[state.selectedSlot] }, { saving: false });
      return Object.assign({ ...state }, {
        slots: Object.assign({ ...state.slots }, { [state.selectedSlot]: slot })
      });
    default:
      newSlots = { ...state.slots };
      if (state.selectedSlot) {
        newSlots[state.selectedSlot].sortCriteria = sortCriteria(newSlots[state.selectedSlot].sortCriteria, action);
      }
      return Object.assign({ ...state }, { slots: newSlots });
  }
}

export function getSortCriteria({ slots, selectedSlot }) {
  return slots[selectedSlot] && slots[selectedSlot].sortCriteria;
}