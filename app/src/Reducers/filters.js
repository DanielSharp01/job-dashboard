import {
  ADD_FILTER,
  CHANGE_FILTER_PROPERTY,
  REMOVE_FILTER,
  ADD_LIST_FILTER_VALUE,
  TOGGLE_LIST_FILTER_VALUE,
  REMOVE_LIST_FILTER_VALUE,
  CHANGE_RANGE_FILTER_VALUE,
  CHANGE_LIST_FILTER_INCLUDE_TYPE
} from "../Actions";

import uuidv4 from "uuid/v4";

export const properties = ["Tags", "Min pay", "Min hours", "Organization"];

function propertyFilterMap(property) {
  switch (property) {
    case "Tags":
      return {
        type: "list",
        includeType: "all",
        values: []
      };
    case "Organization":
      return {
        type: "fixed-list",
        values: [{ id: uuidv4(), name: "Műisz", checked: true }, { id: uuidv4(), name: "Schönherz", checked: true }]
      };
    case "Min pay":
      return {
        type: "range",
        from: true,
        to: false,
        allowFloat: true,
        allowNegative: false,
        metric: "Ft/hr",
        fromValue: 0
      };
    case "Min hours":
      return {
        type: "range",
        from: true,
        to: true,
        allowFloat: false,
        allowNegative: false,
        metric: "hr",
        fromValue: 0,
        toValue: 40
      };
    default:
      return {}
  }
}

export default (state = [], action) => {
  let values;
  switch (action.type) {
    case ADD_FILTER:
      return [...state, { id: uuidv4(), property: properties[0], ...propertyFilterMap(properties[0]) }]
    case CHANGE_FILTER_PROPERTY:
      return [
        ...state.slice(0, action.index),
        { id: state[action.index].id, property: action.property, ...propertyFilterMap(action.property) },
        ...state.slice(action.index + 1)
      ];
    case ADD_LIST_FILTER_VALUE:
      values = state[action.index].values;
      if (values.filter(v => v.name === action.value).length > 0) return state;

      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index],
          {
            values: [...values, { id: uuidv4(), name: action.value, checked: true }]
          }),
        ...state.slice(action.index + 1)
      ];
    case TOGGLE_LIST_FILTER_VALUE:
      values = state[action.index].values;
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index],
          {
            values: [
              ...values.slice(0, action.valueIndex),
              Object.assign({}, values[action.valueIndex], { checked: !values[action.valueIndex].checked }),
              ...values.slice(action.valueIndex + 1)
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
      values = state[action.index].values;
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index],
          {
            values: [
              ...values.slice(0, action.valueIndex),
              ...values.slice(action.valueIndex + 1)
            ]
          }),
        ...state.slice(action.index + 1)
      ];
    case CHANGE_RANGE_FILTER_VALUE:
      let from = action.from === "" ? "" : (typeof action.from !== "undefined") ? parseInt(action.from) : state[action.index].fromValue;
      let to = action.to === "" ? "" : (typeof action.to !== "undefined") ? parseInt(action.to) : state[action.index].toValue;

      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index],
          {
            fromValue: from,
            toValue: to
          }),
        ...state.slice(action.index + 1)
      ];
    case REMOVE_FILTER:
      return [...state.slice(0, action.index), ...state.slice(action.index + 1)];
    default:
      return state;
  }
}