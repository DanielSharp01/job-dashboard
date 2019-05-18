import {
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

import filterClassMap, { createFilter } from "../Filters/filterMapping";
import uuidv4 from "uuid/v4";

const properties = Object.keys(filterClassMap);

export default (state = [], action) => {
  let entries;
  switch (action.type) {
    case ADD_FILTER:
      return [...state, { id: uuidv4(), ...createFilter(properties[0]) }]
    case CHANGE_FILTER_PROPERTY:
      return [
        ...state.slice(0, action.index),
        { id: state[action.index].id, ...createFilter(action.property) },
        ...state.slice(action.index + 1)
      ];
    case ADD_LIST_FILTER_VALUE:
      entries = state[action.index].entries;
      if (entries.filter(v => v.name === action.value).length > 0) return state;

      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index],
          {
            entries: [...entries, { id: uuidv4(), name: action.value, checked: true }]
          }),
        ...state.slice(action.index + 1)
      ];
    case TOGGLE_LIST_FILTER_VALUE:
      entries = state[action.index].entries;
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index],
          {
            entries: [
              ...entries.slice(0, action.valueIndex),
              Object.assign({}, entries[action.valueIndex], { checked: !entries[action.valueIndex].checked }),
              ...entries.slice(action.valueIndex + 1)
            ]
          }),
        ...state.slice(action.index + 1)
      ];
    case CHANGE_LIST_FILTER_INCLUDE_TYPE:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], { includeType: action.includeType }),
        ...state.slice(action.index + 1)
      ];
    case REMOVE_LIST_FILTER_VALUE:
      entries = state[action.index].entries;
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index],
          {
            entries: [
              ...entries.slice(0, action.valueIndex),
              ...entries.slice(action.valueIndex + 1)
            ]
          }),
        ...state.slice(action.index + 1)
      ];
    case CHANGE_RANGE_FILTER_VALUE:

      let from, to;
      if (action.from === "") {
        from = "";
      }
      else if (typeof action.from === "undefined") {
        from = state[action.index].from;
      }
      else if (filterClassMap[state[action.index].property].rangeType === "DATE") {
        from = action.from;
      } else {
        from = parseInt(action.from);
      }

      if (action.to === "") {
        to = "";
      }
      else if (typeof action.to === "undefined") {
        to = state[action.index].to;
      }
      else if (filterClassMap[state[action.index].property].rangeType === "DATE") {
        to = action.to;
      } else {
        to = parseInt(action.to);
      }

      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], { from, to }),
        ...state.slice(action.index + 1)
      ];
    case CHANGE_STRING_FILTER_VALUE:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], { string: action.value }),
        ...state.slice(action.index + 1)
      ];
    case CHANGE_FILTER_STRING_MATCH_FLAGS:
      let { matchCase, wholeWord, regex } = action;
      return [
        ...state.slice(0, action.index),
        Object.assignDefined({}, state[action.index], { matchCase, wholeWord, regex }),
        ...state.slice(action.index + 1)
      ];
    case REMOVE_FILTER:
      return [...state.slice(0, action.index), ...state.slice(action.index + 1)];
    default:
      return state;
  }
}