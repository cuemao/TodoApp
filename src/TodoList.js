import React, { Component } from 'react';
import './App.css';
import removeIco24 from './pic/remove_24.png';
import editIco24 from './pic/edit_24.png';
import TodoItem from './TodoItem';
import CountDisplay from './CountDisplay';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tmpName: this.props.listName,
      edit: false,
    };
    this.newItem = this.newItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.removeList = this.removeList.bind(this);
    this.checkItem = this.checkItem.bind(this);
    this.clickEdit = this.clickEdit.bind(this);
    this.editList = this.editList.bind(this);
    this.editItem = this.editItem.bind(this);
  }

  newItem(e) {
    if (e.key === 'Enter') {
      this.props.onNewItem(this.props.idx, e.target.value);
      e.target.value = '';
    }
  }

  removeItem(itemIdx) {
    this.props.onRemoveItem(this.props.idx, itemIdx);
  }

  removeList() {
    this.props.onRemoveList(this.props.idx);
  }

  checkItem(itemIdx) {
    this.props.onCheckItem(this.props.idx, itemIdx);
  }

  clickEdit() {
    const edit = this.state.edit;
    if (edit) {
      this.props.onEditList(this.props.idx, this.state.tmpName);
      this.setState({ edit: false });
    } else {
      this.setState({ edit: !this.state.edit });
    }
  }

  editList(e) {
    if (e.key === 'Enter') {
      this.props.onEditList(this.props.idx, e.target.value);
      this.setState({ edit: false });
    } else {
      this.setState({ tmpName: e.target.value });
    }
  }

  editItem(itemIdx, itemName) {
    this.props.onEditItem(this.props.idx, itemIdx, itemName);
  }

  render() {
    const display = this.props.display;

    const ITEMs = (display === 'ALL') ?
      this.props.items.map((item, i) =>
        <TodoItem
          key={i} idx={i}
          itemName={item.name}
          itemDone={item.done}
          onRemoveItem={this.removeItem}
          onCheckItem={this.checkItem}
          onEditItem={this.editItem}
        />) : (display === 'DONE') ?
            this.props.items.map((item, i) => item.done ?
              <TodoItem
                key={i} idx={i}
                itemName={item.name}
                itemDone={item.done}
                onRemoveItem={this.removeItem}
                onCheckItem={this.checkItem}
                onEditItem={this.editItem}
              /> : null) :
                this.props.items.map((item, i) => !item.done ?
                  <TodoItem
                    key={i} idx={i}
                    itemName={item.name}
                    itemDone={item.done}
                    onRemoveItem={this.removeItem}
                    onCheckItem={this.checkItem}
                    onEditItem={this.editItem}
                  /> : null);

    const listTitle = this.state.edit ?
      <span className="ListName">
        <input
          type="text" className="edit" defaultValue={this.props.listName}
          onKeyPress={this.editList} onChange={this.editList}
        />
      </span> :
      <span className="ListName" title={this.props.listName}>
        {this.props.listName}
      </span>;

    return (
      <span className="ListBackground">
        <div className="ListTitle">
          {listTitle}
          <img
            alt="Remove" className="EditnRemove"
            src={removeIco24} onClick={this.removeList}
          />
          <img
            alt="Edit"className="EditnRemove"
            src={editIco24} onClick={this.clickEdit}
          />
        </div>
        <div style={{ marginLeft: '5px', marginBottom: '5px' }}>
          {(this.props.display !== 'DONE') ?
            <input
              type="text" placeholder="Add New Item"
              onKeyPress={this.newItem}
            /> : null}
        </div>
        <span className="TodoList ScrollBar">
          {ITEMs}
        </span>
        <div className="ListCount">
          <CountDisplay
            display={this.props.display}
            numDone={this.props.numDone} numLeft={this.props.numLeft}
          />
        </div>
      </span>
    );
  }
}

TodoList.propTypes = {
  idx: React.PropTypes.number,
  numDone: React.PropTypes.number,
  numLeft: React.PropTypes.number,
  listName: React.PropTypes.string,
  items: React.PropTypes.array,
  onNewItem: React.PropTypes.func,
  onRemoveItem: React.PropTypes.func,
  onRemoveList: React.PropTypes.func,
  onCheckItem: React.PropTypes.func,
  onEditList: React.PropTypes.func,
  onEditItem: React.PropTypes.func,
  display: React.PropTypes.string,
};

export default TodoList;
