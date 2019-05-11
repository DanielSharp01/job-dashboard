import React, { Component } from 'react';
import Textbox from '../Textbox/Textbox';
import "./CheckListInput.scss";

export default class CheckListInput extends Component {
  constructor(props) {
    super(props);
    this.state = { newItem: "" }
  }

  onTextChanged(text) {
    this.setState({ newItem: text });
  }

  onAddButtonClicked() {
    this.props.onAdd && this.props.onAdd(this.state.newItem)
    this.setState({ newItem: "" });
  }

  render() {
    const { fixed, list, onRemove, onChecked } = this.props;
    return (<div className="checklist-input">
      <ul>
        {
          list.map(v => (
            <li className="list-item" key={v.id}>
              <label>
                <input type="checkbox" checked={v.checked} onChange={() => onChecked && onChecked(v.index)} />
                {v.name}
              </label>
              {(!fixed && <button className="delete-button" onClick={() => onRemove && onRemove(v.index)}>
                <i className="fas fa-times"></i>
              </button>)}
            </li>
          ))
        }
      </ul >
      {!fixed && <div className={"textbox-with-button"}>
        <Textbox value={this.state.newItem} onChange={(text) => this.onTextChanged(text)} />
        <button onClick={() => this.onAddButtonClicked()} disabled={this.state.newItem === ""}>Add</button>
      </div>
      }
    </div >);
  }
}