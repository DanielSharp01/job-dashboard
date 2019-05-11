import React, { Fragment } from 'react';
import Header from "../Header/Header";
import Sidenav from "../Sidenav/Sidenav";
import CardGrid from "../CardGrid/CardGrid";
import "./App.scss";

export default function App() {
  return <Fragment>
    <Header />
    <div className="wrapper">
      <Sidenav />
      <CardGrid />
    </div>
  </Fragment>
}