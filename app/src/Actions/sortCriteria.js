import {
  ADD_SORT_CRITERIA,
  CHANGE_SORT_CRITERIA_PROPERTY,
  CHANGE_SORT_CRITERIA_DIRECTION,
  MOVE_SORT_CRITERIA,
  REMOVE_SORT_CRITERIA
} from "./index";

export function addSortCriteria() {
  return {
    type: ADD_SORT_CRITERIA
  }
}

export function changeSortCriteriaProperty(index, property) {
  return {
    type: CHANGE_SORT_CRITERIA_PROPERTY,
    index,
    property
  }
}

export function changeSortCriteriaDirection(index, direction) {
  return {
    type: CHANGE_SORT_CRITERIA_DIRECTION,
    index,
    direction
  }
}

export function moveSortCriteria(index, direction) {
  return {
    type: MOVE_SORT_CRITERIA,
    index,
    direction
  }
}

export function removeSortCriteria(index) {
  return {
    type: REMOVE_SORT_CRITERIA,
    index
  }
}