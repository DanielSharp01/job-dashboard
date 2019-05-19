import {
  RECIEVE_SORT_CRITERIA_SLOTS,
  ADD_SORT_CRITERIA_SLOT,
  CHANGE_SORT_CRITERIA_SLOT_ADD_TEXT,
  CHANGE_SORT_CRITERIA_SLOT,
  RENAME_SORT_CRITERIA_SLOT,
  REMOVE_SORT_CRITERIA_SLOT,
  SAVING_SORT_CRITERIA_SLOT,
  SAVED_SORT_CRITERIA_SLOT
} from "./index";

import { getSortCriteria } from "../Reducers/sortCriteriaSlots";

export function recieveSortCriteriaSlots(slots) {
  return {
    type: RECIEVE_SORT_CRITERIA_SLOTS,
    slots
  }
}

export function fetchSortCriteriaSlots() {
  return async (dispatch) => {
    try {
      let res = await fetch("http://localhost:3100/sort-criteria-slots");
      let slots = await res.json();
      dispatch(recieveSortCriteriaSlots(slots));
    }
    catch (err) {
      console.error(err);
      // TODO: Maybe handle in the future
    }
  }
}

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
  return async (dispatch, getState) => {
    try {
      let body = { slot: getState().sortCriteriaSlots.selectedSlot }
      dispatch({ type: REMOVE_SORT_CRITERIA_SLOT });
      await fetch("http://localhost:3100/sort-criteria-slots", {
        method: "DELETE",
        body: JSON.stringify(body),
        headers: new Headers({ 'content-type': 'application/json' })
      });
    }
    catch (err) {
      console.error(err);
      // TODO: Maybe handle in the future
    }
  }
}

export function savingSortCriteriaSlot(name) {
  return {
    type: SAVING_SORT_CRITERIA_SLOT
  }
}

export function saveSortCriteriaSlot() {
  return async (dispatch, getState) => {
    let sortCriteria = getState().sortCriteriaSlots;
    try {
      dispatch(savingSortCriteriaSlot(sortCriteria.selectedSlot));
      let body = { slot: sortCriteria.selectedSlot, content: getSortCriteria(sortCriteria) }
      await fetch("http://localhost:3100/sort-criteria-slots", {
        method: "POST",
        body: JSON.stringify(body),
        headers: new Headers({ 'content-type': 'application/json' })
      });
      dispatch(savedSortCriteriaSlot(sortCriteria.selectedSlot, true));
    }
    catch (err) {
      dispatch(savedSortCriteriaSlot(sortCriteria.selectedSlot, false));
    }
  }
}

export function savedSortCriteriaSlot(name, success) {
  return {
    type: SAVED_SORT_CRITERIA_SLOT,
    name,
    success
  }
}