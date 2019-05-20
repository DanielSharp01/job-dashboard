import moment from "moment";
import filterClassMap from "./filterMapping";

const filterFuncMap = {
  "RANGE": rangeFilter,
  "LIST": listFilter,
  "STRING": stringFilter
}
export default filterFuncMap;

function rangeFilter(filterClass, job, filterInstance) {
  let propertyVal = filterClass.property(job);

  const zeroIsTrue = (val) => (val === 0) ? true : val;

  function nullFilter(filterClassVal, propertyVal, filterVal) {
    return (filterClassVal.enabled ? filterVal : filterClassVal.initialValue) || zeroIsTrue(propertyVal);
  }

  function fromFilter(filterClassVal, rangeType, propertyVal, filterVal) {
    if (rangeType === "DATE") {
      let filterMoment = moment(filterVal);
      if (!filterMoment) return false;
      return !filterClassVal.enabled || (zeroIsTrue(propertyVal) && zeroIsTrue(filterVal)
        && !moment(propertyVal).isBefore(filterMoment));

    }
    else {
      return !filterClassVal.enabled || (zeroIsTrue(propertyVal) && zeroIsTrue(filterVal) && propertyVal >= filterVal);
    }
  }

  function toFilter(filterClassVal, rangeType, propertyVal, filterVal) {
    if (rangeType === "DATE") {
      let filterMoment = moment(filterVal);
      if (!filterMoment) return false;
      return !filterClassVal.enabled || (zeroIsTrue(propertyVal) && zeroIsTrue(filterVal)
        && !moment(propertyVal).isAfter(filterMoment));
    }
    else {
      return !filterClassVal.enabled || (zeroIsTrue(propertyVal) && zeroIsTrue(filterVal) && propertyVal <= filterVal);
    }
  }

  return nullFilter(filterClass.canBeNull, propertyVal, filterInstance.canBeNull)
    && fromFilter(filterClass.from, filterClass.rangeType, propertyVal, filterInstance.from)
    && toFilter(filterClass.to, filterClass.rangeType, propertyVal, filterInstance.to)
}

const listFilterTypes = {
  "any": (haystack, needle, includeFunction) =>
    needle.length === 0 || haystack.filter(he =>
      needle.filter(ne => includeFunction(he, ne)).length > 0).length > 0,
  "all": (haystack, needle, includeFunction) =>
    needle.filter(ne => haystack.filter(he =>
      includeFunction(he, ne)).length === 0).length === 0,
  "none": (haystack, needle, includeFunction) =>
    haystack.filter(he => needle.filter(ne =>
      includeFunction(he, ne)).length > 0).length === 0
}

function getIncludeFunction(matchCase, wholeWord, regex) {
  function wrapWholeWord(wrappable) {
    if (wholeWord) return `(?<![\\w\\d])${wrappable}(?![\\w\\d])`;
    else return wrappable;
  }
  function wrapRegex(wrappable) {
    // Courtesy of https://stackoverflow.com/a/3561711/2132821
    if (!regex) return wrappable.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    else return wrappable;
  }

  return (he, ne) => {
    try {
      return new RegExp(wrapWholeWord(wrapRegex(ne)), !matchCase ? "i" : "").test(he)
    }
    catch (err) { return false; }
  }
}

// This is basically constexpr
const includeFunctions = {
  "true.true.true": getIncludeFunction(true, true, true),
  "true.true.false": getIncludeFunction(true, true, false),
  "true.false.true": getIncludeFunction(true, false, true),
  "true.false.false": getIncludeFunction(true, false, false),
  "false.true.true": getIncludeFunction(false, true, true),
  "false.true.false": getIncludeFunction(false, true, false),
  "false.false.true": getIncludeFunction(false, false, true),
  "false.false.false": getIncludeFunction(false, false, false),
}

function listFilter(filterClass, job, filterInstance) {
  let prop = filterClass.property(job);
  let includeTypeSpl = filterInstance.includeType.split("-");
  if (!Array.isArray(prop)) prop = [prop];
  return listFilterTypes[includeTypeSpl[0]](
    prop, filterInstance.entries.filter(v => v.checked).map(v => v.name),
    includeFunctions[`${filterInstance.matchCase}.${filterInstance.wholeWord}.${filterInstance.regex}`])
    && (includeTypeSpl.length === 1 || listFilterTypes[includeTypeSpl[1]](
      prop, filterInstance.entries.filter(v => !v.checked).map(v => v.name),
      includeFunctions[`${filterInstance.matchCase}.${filterInstance.wholeWord}.${filterInstance.regex}`]));
}

function stringFilter(filterClass, job, filterInstance) {
  return includeFunctions[`${filterInstance.matchCase}.${filterInstance.wholeWord}.${filterInstance.regex}`](
    filterClass.property(job), filterInstance.string);
}

export const filterJobs = (jobs, filters) => {
  if (filters.length === 0) return jobs;
  let filterClass = filterClassMap[filters[0].property];
  let filterFunc = filterFuncMap[filterClass.type];
  jobs = jobs.filter((job) => filterFunc(filterClass, job, filters[0]));
  return filterJobs(jobs, filters.slice(1));
}