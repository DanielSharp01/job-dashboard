import React, { Component } from "react";
import "./Header.scss";
import JobCard from "../JobCard/JobCard";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { openPanel: false };
  }

  render() {
    // TODO: Separate out components
    return (
      <header>
        <h1>Job dashboard</h1>
        <div className="right-header">
          <div className="accounts">
            Welcome {window.clientName}! <a href="/logout">Logout</a>
          </div>
          <div
            className="notification-icon"
            onClick={() => {
              if (this.props.jobs.length > 0) this.setState({ openPanel: !this.state.openPanel });
            }}
          >
            <i className="fas fa-bell" />
            {this.state.openPanel && (
              <div className="notification-panel">
                {this.props.jobs.map(job => (
                  <JobCard onRead={() => this.props.markAsRead(job.id)} key={job.id} {...job} className={"compact"} />
                ))}
              </div>
            )}
            {this.props.jobs.filter(j => !j.read).length > 0 && (
              <div className="notification-counter">{this.props.jobs.filter(j => !j.read).length}</div>
            )}
          </div>
          {this.props.popupJob && (
            <div className="popup-notification" key={this.props.popupJob.id}>
              <JobCard onRead={() => this.props.markAsRead(this.props.popupJob.id)} {...this.props.popupJob} className={"notification"} />
            </div>
          )}
        </div>
      </header>
    );
  }
}
