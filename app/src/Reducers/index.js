import { combineReducers } from "redux";
import jobs from "./jobs";
import filters from "./filters";
import sortCriteria from "./sortCriteria";

export default combineReducers({
  jobs,
  filters,
  sortCriteria
});