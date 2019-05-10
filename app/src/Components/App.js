import React, { Fragment } from 'react';
import Header from "./Header";
import Sidenav from "./Sidenav";
import CardGrid from "./CardGrid";

export default function App() {
  return <Fragment>
    <Header />
    <div className="wrapper">
      <Sidenav />
      <CardGrid />
    </div>
  </Fragment>
}