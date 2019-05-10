import React from 'react';
import ReactDOM from 'react-dom';
import App from "./Components/App";
import "./index.scss";

/*ReactDOM.render(<Filter
  properties={["Pay", "Tags", "Hours"]}
  component={<RangeInput from={true} to={true} metric={"ft/h"} allowFloat={false} allowNegative={false} />}
/>, document.getElementById('root'));*/

/*ReactDOM.render(<Filter
  properties={["Pay", "Tags", "Hours"]}
  component={<CheckListInput fixed={false} list={["C#", "Asp.net", "MySQL"]} />}
/>, document.getElementById('root'));*/

// ReactDOM.render(<SortCriteria properties={["Pay", "Hours"]} />, document.getElementById('root'));

ReactDOM.render(<App />, document.getElementById('root'));