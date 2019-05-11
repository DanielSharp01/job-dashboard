import React from 'react';
import ReactDOM from 'react-dom';
import App from "./Components/App/App";
import { createStore, applyMiddleware } from "redux";
import reducer from "./Reducers";
import { newJob, recieveJobs } from "./Actions/jobs";
import uuidv4 from "uuid/v4";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';


const logMW = (store) => (next) => {
  return (action) => {
    console.group((typeof action.type !== "undefined") ? action.type : "redux-thunk");
    console.log("Before", store.getState());
    console.log("Action", action);
    const retVal = next(action);
    console.log("After", store.getState());
    console.groupEnd();
    return retVal;
  }
}

const store = createStore(reducer, applyMiddleware(logMW, thunk));
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
store.dispatch(recieveJobsAsync());
store.dispatch(newJobAsync());

function recieveJobsAsync() {
  return dispatch => {
    setTimeout(() => {
      dispatch(recieveJobs([
        { id: uuidv4(), name: "C# developer", pay: 1500, tags: ["C#", "Asp.net", "MySQL"], organization: "Müisz", date: "2019.05.02.", minHours: 20, maxHours: 40 },
        { id: uuidv4(), name: "Javascript developer", pay: 1800, tags: ["JS", "Express", "Angular", "React", "MongoDB"], organization: "Schönherz", date: "2019.05.03.", minHours: 25 },
      ]));
    }, 100);
  };
}

function newJobAsync() {
  return dispatch => {
    setTimeout(() => {
      dispatch(newJob(
        { id: uuidv4(), name: "Java developer", pay: 1300, tags: ["Java", "Hibernate", "Oracle", "MySQL"], organization: "Müisz", date: "2019.05.03.", maxHours: 40 }
      ));
    }, 1000);
  };
}