# Filter and sort criteria redesign

## Property mapping for filters
```js
["<property>"] = {
  
  type: "RANGE" | "LIST", "STRING",
  filter: (propertyValue, filterInstance) => true | false,

  // Range
  rangeType: "INTEGER" | "NUMBER" | "DATE",
  from: { enabled: true|false, initialValue: "<from-value>" },
  to: { enabled: true|false, initialValue: "<to-value>" },
  canBeNullOption: true | false

  // List
  fixed: true | false,
  fixEntries: ["<entry1>", "<entry2>", "<entry3>"],
  // Can be just one element which means no selection on the UI
  includeTypes: ["all", "any", "none"],

  // Non fixed list properties
  // Map the job to the haystack of the autocomplete
  autoCompleteHaystack: (jobs) => ["<haystack>"]

  // String doesn't have any additional properties
}

function createFilter(property)
{
  let filterClass = filterMapping[property];
  switch (filterClass.type)
  {
    ...
  }
}
```

## Model for filter:

```js
{
  property: "<property>",

  // Range
  from: "<value>",
  to: "<value>",
  canBeNull: true | false,

  // List
  entries: [], // Does not work in fixed
  matchCase: true | false, // Does not work in fixed
  wholeWord: true | false, // Does not work in fixed
  regex: true | false, // Does not work in fixed
  includeType: "all" | "any" | "none",

  // String
  string: "<whatever search>",
  matchCase: true | false,
  wholeWord: true | false,
  regex: true | false
}
```

## Property mapping for sort criteria
```js
["<property>"] = {
  comparator: (aPropValue, bPropValue) => 1 | 0 | -1
}
```

## Model for sort criteria

```js
{
  property: "<property>",
  direction: "asc" | "desc"
}
```

# Notifications

## Server side

We save filters into a mixed javascript object.  
Saving `N` filters for a sort of *pseudo account* into so called **filter slots**.

We should also be able to save sort criteria into **sort criteria slots**

Create a very basic account system.

## Client side

Load and save from **filter slots** and **sort criteria slots**.
Special always active filter slot called **Notification filter**.

Notification bell icon with a list of compactified job cards.

Login page.