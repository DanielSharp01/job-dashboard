import React, { Component } from 'react';

export default class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: this.props.checked || false };
  }

  onChecked(e) {
    this.props.onChecked && this.props.onChecked(!this.state.checked);
    this.setState({ checked: !this.state.checked });
  }

  render() {
    return (<label>
      <input type="checkbox" checked={this.state.checked} onChange={(e) => this.onChecked(e)} />
      {this.props.children}
    </label>);
  }
}