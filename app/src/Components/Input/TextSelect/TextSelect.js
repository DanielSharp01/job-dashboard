import React, { Component, Fragment } from 'react';

export default class TextSelect extends Component {
  onInput(e) {
    this.props.onChange && this.props.onChange(e.target.value);
    if (!Object.prototype.toString.call(e.nativeEvent).includes("InputEvent")) {
      this.props.onClickChange && this.props.onClickChange(e.target.value);
    }
  }

  onMouseDown() {
    this.props.onChange && this.props.onChange("");
  }

  render() {
    return (<Fragment>
      <input type="text" list={this.props.id} value={this.props.value}
        onInput={(e) => this.onInput(e)} onMouseDown={() => this.onMouseDown()} />
      <datalist id={this.props.id}>
        {this.props.entries.map(item => <option key={item} value={item}>{item}</option>)}
      </datalist>
    </Fragment >);
  }
}