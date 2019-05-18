import React, { Component } from 'react';

export default class Textbox extends Component {
  onChanged(e) {
    if (this.props.validate && !this.props.validate(e.target.value)) return;

    this.props.onChange && this.props.onChange(e.target.value);
  }

  render() {
    let softValidation = this.props.softValidate && this.props.softValidate(this.props.value);
    return (<input type="text"
      autoComplete={this.props.autoComplete || "off"}
      className={softValidation === false ? "validate-error" : ""}
      id={this.props.id}
      value={this.props.value}
      onChange={(e) => this.onChanged(e)} />);
  }
}