import React, { Component, Fragment } from 'react';

export default class RadioButtons extends Component {
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
      {this.props.values.map(v => (<label id={v}>
        <input type="radio"
          value={v}
          name={this.props.name}
          checked={v === this.state.value}
          onChange={e => this.onChecked(e)} />
        {v}
      </label>))}
    </Fragment>);
  }
}