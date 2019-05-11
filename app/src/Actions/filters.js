import {
  ADD_FILTER,
  CHANGE_FILTER_PROPERTY,
  REMOVE_FILTER,
  ADD_LIST_FILTER_VALUE,
  TOGGLE_LIST_FILTER_VALUE,
  REMOVE_LIST_FILTER_VALUE,
  CHANGE_RANGE_FILTER_VALUE
} from "./index";

export function addFilter() {
  return {
    type: ADD_FILTER
  }
}

export function changeFilterProperty(index, property) {
  return {
    type: CHANGE_FILTER_PROPERTY,
    index,
    property
  }
}

export function removeFilter(index) {
  return {
    type: REMOVE_FILTER,
    index
  }
}

export function addListFilterValue(index, value) {
  return {
    type: ADD_LIST_FILTER_VALUE,
    index,
    value
  }
}

export function toggleListFilterValue(index, valueIndex, checked) {
  return {
    type: TOGGLE_LIST_FILTER_VALUE,
    index,
    valueIndex,
    checked
  }
}

export function removeListFilterValue(index, valueIndex) {
  return {
    type: REMOVE_LIST_FILTER_VALUE,
    index,
    valueIndex
  }
}

export function changeRangeFilterValue(index, { from, to }) {
  return {
    type: CHANGE_RANGE_FILTER_VALUE,
    index,
    from,
    to
  }
}