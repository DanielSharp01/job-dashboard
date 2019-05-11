import React, { Component, Fragment } from 'react';
import uuidv4 from "uuid/v4";

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
      {this.props.values.map(v => (<label key={v}>
        <input type="radio"
          value={v}
          name={uuidv4()}
          checked={v === this.state.value}
          onChange={e => this.onChecked(e)} />
        {v}
      </label>))}
    </Fragment>);
  }
}