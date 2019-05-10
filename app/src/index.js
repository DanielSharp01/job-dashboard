import React from 'react';
import ReactDOM from 'react-dom';
import Filter from "./Components/Filter";
import SortCriteria from './Components/SortCriteria';
import CheckListInput from "./Components/Input/CheckListInput"
import JobCard from './Components/JobCard';

/*ReactDOM.render(<Filter
  properties={["Pay", "Tags", "Hours"]}
  component={<RangeInput from={true} to={true} metric={"ft/h"} allowFloat={false} allowNegative={false} />}
/>, document.getElementById('root'));*/

/*ReactDOM.render(<Filter
  properties={["Pay", "Tags", "Hours"]}
  component={<CheckListInput fixed={false} list={["C#", "Asp.net", "MySQL"]} />}
/>, document.getElementById('root'));*/

// ReactDOM.render(<SortCriteria properties={["Pay", "Hours"]} />, document.getElementById('root'));

ReactDOM.render(<JobCard name="C# developer"
  pay={1500}
  tags={["C#", "Asp.net", "MySQL"]}
  organization={"org1"}
  date={"2019.05.12."}
  compact={false}
/>, document.getElementById('root'));