import React, { Component } from 'react';
import Textbox from '../Textbox/Textbox';
import Checkbox from "../Checkbox/Checkbox";
import "./CheckListInput.scss";

export default class CheckListInput extends Component {
  constructor(props) {
    super(props);
    this.state = { newItem: "" }
  }

  onTextChanged(text) {
    this.setState({ newItem: text });
  }

  render() {
    const { fixed, list, onAdd } = this.props;
    return (<div className="checklist-input">
      <ul>
        {
          list.map((v, i) => (
            <li className="list-item" key={i}>
              <Checkbox checked={true}>{v}</Checkbox>
              {(!fixed && <button className="delete-button"><i className="fas fa-times"></i></button>)}
            </li>
          ))
        }
      </ul >
      {!fixed && <div className={"textbox-with-button"}>
        <Textbox onChanged={(text) => this.onTextChanged(text)} />
        <button onClick={e => onAdd && onAdd(this.state.newItem)} disabled={this.state.newItem === ""}>Add</button>
      </div>
      }
    </div >);
  }
}