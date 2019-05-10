import React, { Component, Fragment } from 'react';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value };
  }

  onChecked(e) {
    this.props.onChanged && this.props.onChanged(e.target.value);
    this.setState({ value: e.target.value });
  }

  render() {
    return (<Fragment>
      {this.props.values.map(v => (<label id={v.key}>
        <input type="radio"
          value={v.key}
          name={this.props.name}
          checked={v.key === this.state.value}
          onChange={e => this.onChecked(e)} />
        {v.value}
      </label>))}
    </Fragment>);
  }
}