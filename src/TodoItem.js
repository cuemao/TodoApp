import React, { Component } from 'react';
import './App.css';
import removeIco16 from './pic/remove_16.png';
import editIco16 from './pic/edit_16.png';
import checkboxIco from './pic/checkbox.png';
import checkIco from './pic/check.png';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tmpName: this.props.itemName,
      edit: false,
    };
    this.removeItem = this.removeItem.bind(this);
    this.checkItem = this.checkItem.bind(this);
    this.clickEdit = this.clickEdit.bind(this);
    this.editItem = this.editItem.bind(this);
  }

  removeItem() {
    this.props.onRemoveItem(this.props.idx);
  }

  checkItem() {
    this.props.onCheckItem(this.props.idx);
  }

  clickEdit() {
    const edit = this.state.edit;
    if (edit) {
      this.props.onEditItem(this.props.idx, this.state.tmpName);
      this.setState({ edit: false });
    } else {
      this.setState({ edit: !this.state.edit });
    }
  }

  editItem(e) {
    if (e.key === 'Enter') {
      this.props.onEditItem(this.props.idx, e.target.value);
      this.setState({ edit: false });
    } else {
      this.setState({ tmpName: e.target.value });
    }
  }

  render() {
    const done = this.props.itemDone;

    const checkBox = done ?
      <img
        alt="done" className="CheckBox"
        src={checkIco} onClick={this.checkItem}
      /> :
      <img
        alt="undone" className="CheckBox"
        src={checkboxIco} onClick={this.checkItem}
      />;

    const itemTitle = this.state.edit ?
      <span className="ItemName">
        <input
          type="text" className="edit" defaultValue={this.props.itemName}
          onKeyPress={this.editItem} onChange={this.editItem}
        />
      </span> : done ?
        <span
          title={this.props.itemName} className="ItemName Done"
          onClick={this.checkItem}
        >
          {this.props.itemName}
        </span> :
        <span
          title={this.props.itemName} className="ItemName"
          onClick={this.checkItem}
        >
          {this.props.itemName}
        </span>;

    return (
      <div className="TodoItem">
        {checkBox}
        {itemTitle}
        <img
          alt="Remove" className="EditnRemove Trans-down"
          src={removeIco16} onClick={this.removeItem}
        />
        <img
          alt="Edit"className="EditnRemove Trans-down"
          src={editIco16} onClick={this.clickEdit}
        />
      </div>
    );
  }
}

TodoItem.propTypes = {
  idx: React.PropTypes.number,
  itemName: React.PropTypes.string,
  itemDone: React.PropTypes.bool,
  onRemoveItem: React.PropTypes.func,
  onCheckItem: React.PropTypes.func,
  onEditItem: React.PropTypes.func,
};

export default TodoItem;
