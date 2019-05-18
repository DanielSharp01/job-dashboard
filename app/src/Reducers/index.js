import { combineReducers } from "redux";
import jobs from "./jobs";
import filterSlots from "./filterSlots";
import sortCriteriaSlots from "./sortCriteriaSlots";

export default combineReducers({
  jobs,
  filterSlots,
  sortCriteriaSlots
});