import React, { Fragment, Component } from 'react';
import Textbox from './Textbox';
import Checkbox from "./Checkbox";

export default class CheckListInput extends Component {
  constructor(props) {
    super(props);
    this.state = { newItem: "" }
  }

  onTextChanged(text) {
    this.setState({ newItem: text });
  }

  render() {
    const { className, fixed, list, onAdd } = this.props;
    return (<div className={className} >
      {
        list.map((v, i) => (
          <div className="list-item" key={i}><Checkbox checked={true}>{v}</Checkbox> {(!fixed && <button className="delete-button">x</button>)}</div>
        ))
      }
      {!fixed && <Fragment>
        <Textbox onChanged={(text) => this.onTextChanged(text)} />
        <button onClick={e => onAdd && onAdd(this.state.newItem)} disabled={this.state.newItem === ""}>Add</button>
      </Fragment>
      }
    </div >);
  }
}