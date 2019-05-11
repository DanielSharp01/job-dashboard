import React, { Fragment } from 'react';
import Header from "../Header/Header";
import Sidenav from "../Sidenav/Sidenav";
import JobContainer from "../Containers/JobContainer";
import "./App.scss";

export default function App() {
  return <Fragment>
    <Header />
    <div className="wrapper">
      <Sidenav />
      <JobContainer />
    </div>
  </Fragment>
}