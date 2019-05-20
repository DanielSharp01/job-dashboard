import { combineReducers } from "redux";
import jobs from "./jobs";
import filterSlots from "./filterSlots";
import sortCriteriaSlots from "./sortCriteriaSlots";
import notifications from "./notifications";

export default combineReducers({
  jobs,
  filterSlots,
  sortCriteriaSlots,
  notifications
});