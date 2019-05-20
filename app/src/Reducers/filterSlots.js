import {
  RECIEVE_FILTER_SLOTS,
  ADD_FILTER_SLOT,
  CHANGE_FILTER_SLOT_ADD_TEXT,
  CHANGE_FILTER_SLOT,
  RENAME_FILTER_SLOT,
  REMOVE_FILTER_SLOT,
  SAVING_FILTER_SLOT,
  SAVED_FILTER_SLOT,

  ADD_FILTER,
  CHANGE_FILTER_PROPERTY,
  REMOVE_FILTER,
  ADD_LIST_FILTER_VALUE,
  TOGGLE_LIST_FILTER_VALUE,
  REMOVE_LIST_FILTER_VALUE,
  CHANGE_LIST_FILTER_INCLUDE_TYPE,
  CHANGE_RANGE_FILTER_VALUE,
  CHANGE_STRING_FILTER_VALUE,
  CHANGE_FILTER_STRING_MATCH_FLAGS
} from "../Actions";

import filters from "./filters";

export default (state = {
  addText: "Notification Filter",
  selectedSlot: "Notification Filter",
  slots: { "Notification Filter": { filters: [], saving: false, saved: false, modified: false } }
}, action) => {
  let newSlots, slot, newSelectedSlot;
  switch (action.type) {
    case RECIEVE_FILTER_SLOTS:
      let actionSlots = action.slots.reduce((acc, slot) => {
        acc[slot.name] = { filters: slot.content, saving: false, saved: true, modified: false };
        return acc;
      }, {});
      return Object.assign({ ...state }, { slots: { ...state.slots, ...actionSlots } });
    case ADD_FILTER_SLOT:
      if (state.addText === state.selectedSlot) return state;
      return Object.assign({ ...state }, {
        selectedSlot: state.addText, slots:
          { ...state.slots, [state.addText]: { filters: [], saving: false, modified: false } }
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
      let prevSaved = state.slots[state.selectedSlot].saved;
      let prevModified = state.slots[state.selectedSlot].modified;
      slot = Object.assign({ ...state.slots[state.selectedSlot] },
        { saving: false, saved: action.success || prevSaved, modified: !action.success && prevModified });
      return Object.assign({ ...state }, {
        slots: Object.assign({ ...state.slots }, { [state.selectedSlot]: slot })
      });
    case ADD_FILTER:
    case CHANGE_FILTER_PROPERTY:
    case REMOVE_FILTER:
    case ADD_LIST_FILTER_VALUE:
    case TOGGLE_LIST_FILTER_VALUE:
    case REMOVE_LIST_FILTER_VALUE:
    case CHANGE_LIST_FILTER_INCLUDE_TYPE:
    case CHANGE_RANGE_FILTER_VALUE:
    case CHANGE_STRING_FILTER_VALUE:
    case CHANGE_FILTER_STRING_MATCH_FLAGS:
      newSlots = { ...state.slots };
      if (state.selectedSlot) {
        newSlots[state.selectedSlot].filters = filters(newSlots[state.selectedSlot].filters, action);
        newSlots[state.selectedSlot].modified = true;
      }
      return Object.assign({ ...state }, { slots: newSlots });
    default:
      return state;
  }
}

export function getFilters({ slots, selectedSlot }) {
  return slots[selectedSlot] && slots[selectedSlot].filters;
}

export function getNotificationFilters({ slots }) {
  return slots["Notification Filter"].filters;
}