import React, { Component } from 'react';

export default class Textbox extends Component {

  constructor(props) {
    super(props);
  }

  onChanged(e) {
    if (this.props.validate && !this.props.validate(e.target.value)) return;

    this.props.onChange && this.props.onChange(e.target.value);
  }

  render() {
    return (<input type="text"
      autoComplete={this.props.autoComplete || "off"}
      id={this.props.id}
      value={this.props.value}
      onChange={(e) => this.onChanged(e)} />);
  }
}