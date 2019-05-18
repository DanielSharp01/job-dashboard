import {
  ADD_SORT_CRITERIA_SLOT,
  CHANGE_SORT_CRITERIA_SLOT_ADD_TEXT,
  CHANGE_SORT_CRITERIA_SLOT,
  RENAME_SORT_CRITERIA_SLOT,
  REMOVE_SORT_CRITERIA_SLOT,
  SAVE_SORT_CRITERIA_SLOT,
  SAVED_SORT_CRITERIA_SLOT
} from "../Actions";

import sortCriteria from "./sortCriteria";

export default (state = {
  addText: "New slot",
  selectedSlot: "New slot",
  slots: { "New slot": { sortCriteria: [], saving: false } }
}, action) => {
  let newSlots, slot, newSelectedSlot;
  switch (action.type) {
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
    case SAVE_SORT_CRITERIA_SLOT:
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