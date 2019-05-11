import { connect } from 'react-redux'
import SortCriteria from "../SortCriteria/SortCriteria";
import {
  changeSortCriteriaProperty,
  changeSortCriteriaDirection,
  moveSortCriteria,
  removeSortCriteria
} from "../../Actions/sortCriteria"

import { properties } from "../../Reducers/sortCriteria";

const mapStateToProps = ({ sortCriteria }, { index }) => ({
  ...sortCriteria[index],
  properties,
  upButton: index > 0,
  downButton: index < sortCriteria.length - 1
});

const mapDispatchToProps = (dispatch, { index }) => ({
  changeProperty: (property) => dispatch(changeSortCriteriaProperty(index, property)),
  changeDirection: (direction) => dispatch(changeSortCriteriaDirection(index, direction)),
  move: (direction) => dispatch(moveSortCriteria(index, direction)),
  remove: () => dispatch(removeSortCriteria(index))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SortCriteria);