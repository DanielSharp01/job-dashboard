import React, { Component } from 'react';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value };
  }

  onChanged(e) {
    this.props.onChanged && this.props.onChanged(e.target.value);
    this.setState({ value: e.target.value });
  }

  render() {
    return (<select value={this.state.value} onChange={(e) => this.onChanged(e)}>
      {this.props.values.map(v => (<option id={v.key} value={v.key}>{v.value}</option>))}
    </select>);
  }
}