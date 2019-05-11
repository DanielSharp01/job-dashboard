import React, { Component } from 'react';

export default class Textbox extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value || "" };
  }

  onChanged(e) {
    if (this.props.validate && !this.props.validate(e.target.value)) return;

    this.props.onChanged && this.props.onChanged(e.target.value);
    this.setState({ value: e.target.value });
  }

  render() {
    return (<input type="text" value={this.state.value} onChange={(e) => this.onChanged(e)} />);
  }
}