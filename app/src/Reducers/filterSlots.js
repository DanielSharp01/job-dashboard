import {
  RECIEVE_FILTER_SLOTS,
  ADD_FILTER_SLOT,
  CHANGE_FILTER_SLOT_ADD_TEXT,
  CHANGE_FILTER_SLOT,
  RENAME_FILTER_SLOT,
  REMOVE_FILTER_SLOT,
  SAVING_FILTER_SLOT,
  SAVED_FILTER_SLOT,
} from "../Actions";

import filters from "./filters";

export default (state = {
  addText: "Notification Filter",
  selectedSlot: "Notification Filter",
  slots: { "Notification Filter": { filters: [], saving: false } }
}, action) => {
  let newSlots, slot, newSelectedSlot;
  switch (action.type) {
    case RECIEVE_FILTER_SLOTS:
      let actionSlots = Object.keys(action.slots).reduce((acc, key) => {
        acc[key] = { filters: action.slots[key], saving: false };
        return acc;
      }, {});
      return Object.assign({ ...state }, { slots: { ...state.slots, ...actionSlots } });
    case ADD_FILTER_SLOT:
      if (state.addText === state.selectedSlot) return state;
      return Object.assign({ ...state }, {
        selectedSlot: state.addText, slots:
          { ...state.slots, [state.addText]: { filters: [], saving: false } }
      });
    case CHANGE_FILTER_SLOT_ADD_TEXT:
      return Object.assign({ ...state }, { addText: action.text });
    case CHANGE_FILTER_SLOT:
      return Object.assign({ ...state }, { selectedSlot: action.name, addText: action.name });
    case RENAME_FILTER_SLOT:
      newSlots = { ...state.slots };
      slot = newSlots[state.selectedSlot];
      delete newSlots[state.selectedSlot];
      newSlots[state.addText] = slot;

      return Object.assign({ ...state }, {
        selectedSlot: state.addText,
        slots: newSlots
      });
    case REMOVE_FILTER_SLOT:
      newSlots = { ...state.slots };
      delete newSlots[state.selectedSlot];
      newSelectedSlot = Object.keys(newSlots)[0] || null;
      return Object.assign({ ...state }, {
        selectedSlot: newSelectedSlot,
        addText: newSelectedSlot || "",
        slots: newSlots
      });
    case SAVING_FILTER_SLOT:
      slot = Object.assign({ ...state.slots[state.selectedSlot] }, { saving: true });
      return Object.assign({ ...state }, {
        slots: Object.assign({ ...state.slots }, { [state.selectedSlot]: slot })
      });
    case SAVED_FILTER_SLOT:
      slot = Object.assign({ ...state.slots[state.selectedSlot] }, { saving: false });
      return Object.assign({ ...state }, {
        slots: Object.assign({ ...state.slots }, { [state.selectedSlot]: slot })
      });
    default:
      newSlots = { ...state.slots };
      if (state.selectedSlot) {
        newSlots[state.selectedSlot].filters = filters(newSlots[state.selectedSlot].filters, action);
      }
      return Object.assign({ ...state }, { slots: newSlots });
  }
}

export function getFilters({ slots, selectedSlot }) {
  return slots[selectedSlot] && slots[selectedSlot].filters;
}