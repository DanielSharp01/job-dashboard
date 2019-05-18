const filterClassMap = {
  "Min pay": {
    type: "RANGE",
    property: (job) => job.pay && job.pay.min,
    rangeType: "INTEGER",
    metric: "Ft/hr",
    allowNegative: false,
    from: { enabled: true, initialValue: 1000 },
    to: { enabled: false },
    canBeNull: { enabled: true, initialValue: true },
  },
  "Min hours": {
    type: "RANGE",
    property: (job) => job.hours && job.hours.min,
    rangeType: "INTEGER",
    metric: "hrs",
    allowNegative: false,
    from: { enabled: true, initialValue: 0 },
    to: { enabled: true, initialValue: 40 },
    canBeNull: { enabled: true, initialValue: true },
  },
  "Tag": {
    type: "LIST",
    property: (job) => job.tags,
    fixed: false,
    includeTypes: ["any", "any-none", "all", "all-none", "none"],
    forcedAutoComplete: true,
    autoCompleteHaystack: (jobs) => Object.keys(jobs.map(job => job.tags).reduce((acc, tag) => {
      acc[tag] = true;
      return acc;
    }, {}))
  },
  "Organization": {
    type: "LIST",
    property: (job) => job.organization,
    fixed: true,
    entries: ["Műisz", "Schönherz"],
    includeTypes: ["any-none"],
  },
  "Name": {
    type: "STRING",
    property: (job) => job.name,
  },
  "Date": {
    type: "RANGE",
    property: (job) => job.date,
    rangeType: "DATE",
    from: { enabled: true, initialValue: "2000-01-01" },
    to: { enabled: true, initialValue: "2099-12-31" },
    canBeNull: { enabled: false, initialValue: false },
  }
}

export default filterClassMap;

export function createFilter(property) {
  let filterClass = filterClassMap[property];
  switch (filterClass.type) {
    case "RANGE":
      return {
        property,
        from: filterClass.from.enabled ? filterClass.from.initialValue : undefined,
        to: filterClass.to.enabled ? filterClass.to.initialValue : undefined,
        canBeNull: filterClass.canBeNull.enabled ? filterClass.canBeNull.initialValue : undefined
      }
    case "LIST":
      return {
        property,
        entries: filterClass.entries ? filterClass.entries.map(entry => ({ name: entry, checked: true })) : [],
        matchCase: false,
        wholeWord: false,
        regex: false,
        includeType: filterClass.includeTypes[0]
      }
    case "STRING":
      return {
        property,
        string: "",
        matchCase: false,
        wholeWord: false,
        regex: false
      }
    default: return {}
  }
}