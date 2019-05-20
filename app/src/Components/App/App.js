import React, { Fragment } from 'react';
import Sidenav from "../Sidenav/Sidenav";
import JobContainer from "../Containers/JobContainer";
import "./App.scss";
import HeaderContainer from '../Containers/HeaderContainer';

export default function App() {
  return <Fragment>
    <HeaderContainer />
    <div className="wrapper">
      <Sidenav />
      <JobContainer />
    </div>
  </Fragment>
}