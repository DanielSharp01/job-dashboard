import {
  ADD_FILTER_SLOT,
  CHANGE_FILTER_SLOT_ADD_TEXT,
  CHANGE_FILTER_SLOT,
  RENAME_FILTER_SLOT,
  REMOVE_FILTER_SLOT,
  SAVE_FILTER_SLOT,
  SAVED_FILTER_SLOT
} from "./index";

export function addFilterSlot() {
  return {
    type: ADD_FILTER_SLOT,
  }
}

export function changeFilterSlotAddText(text) {
  return {
    type: CHANGE_FILTER_SLOT_ADD_TEXT,
    text
  }
}

export function changeFilterSlot(name) {
  return {
    type: CHANGE_FILTER_SLOT,
    name
  }
}

export function renameFilterSlot(name) {
  return {
    type: RENAME_FILTER_SLOT
  }
}

export function removeFilterSlot(name) {
  return {
    type: REMOVE_FILTER_SLOT
  }
}

export function saveFilterSlot(name) {
  return {
    type: SAVE_FILTER_SLOT
  }
}

export function savedFilterSlot(name) {
  return {
    type: SAVED_FILTER_SLOT,
    name
  }
}