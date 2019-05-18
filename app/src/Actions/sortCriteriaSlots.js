import {
  ADD_SORT_CRITERIA_SLOT,
  CHANGE_SORT_CRITERIA_SLOT_ADD_TEXT,
  CHANGE_SORT_CRITERIA_SLOT,
  RENAME_SORT_CRITERIA_SLOT,
  REMOVE_SORT_CRITERIA_SLOT,
  SAVE_SORT_CRITERIA_SLOT,
  SAVED_SORT_CRITERIA_SLOT
} from "./index";

export function addSortCriteriaSlot() {
  return {
    type: ADD_SORT_CRITERIA_SLOT,
  }
}

export function changeSortCriteriaSlotAddText(text) {
  return {
    type: CHANGE_SORT_CRITERIA_SLOT_ADD_TEXT,
    text
  }
}

export function changeSortCriteriaSlot(name) {
  return {
    type: CHANGE_SORT_CRITERIA_SLOT,
    name
  }
}

export function renameSortCriteriaSlot(name) {
  return {
    type: RENAME_SORT_CRITERIA_SLOT
  }
}

export function removeSortCriteriaSlot(name) {
  return {
    type: REMOVE_SORT_CRITERIA_SLOT
  }
}

export function saveSortCriteriaSlot(name) {
  return {
    type: SAVE_SORT_CRITERIA_SLOT
  }
}

export function savedSortCriteriaSlot(name) {
  return {
    type: SAVED_SORT_CRITERIA_SLOT,
    name
  }
}