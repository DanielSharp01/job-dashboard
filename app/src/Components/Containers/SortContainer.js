import { connect } from 'react-redux'
import SortCriteria from "../SortCriteria/SortCriteria";
import {
  changeSortCriteriaProperty,
  changeSortCriteriaDirection,
  moveSortCriteria,
  removeSortCriteria
} from "../../Actions/sortCriteria"
import { getSortCriteria } from '../../Reducers/sortCriteriaSlots';

import sortClassMap from "../../SortCriteria/sortMapping";

const mapStateToProps = ({ sortCriteriaSlots }, { index }) => {
  let sortCriteria = getSortCriteria(sortCriteriaSlots);
  return ({
    ...sortCriteria[index],
    properties: Object.keys(sortClassMap),
    upButton: index > 0,
    downButton: index < sortCriteria.length - 1
  })
};

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