import React, { Component } from 'react';
import './App.css';
import removeIco_24 from './remove_24.png';
import removeIco_16 from './remove_16.png';
import editIco_24 from './edit_24.png';
import editIco_16 from './edit_16.png';
import checkboxIco from './checkbox.png';
import checkIco from './check.png';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.removeItem = this.removeItem.bind(this);
    this.checkItem = this.checkItem.bind(this);
  }

  removeItem() {
    this.props.onRemoveItem(this.props.idx);
  }

  checkItem() {
    this.props.onCheckItem(this.props.idx);
  }
  
  render() {
    var done = this.props.itemDone;
    var check = done?
      <img alt="done" className="CheckBox"
        src={checkIco} onClick={this.checkItem}/> :
      <img alt="undone" className="CheckBox"
        src={checkboxIco} onClick={this.checkItem}/>;
    var name = done? 
      <span title={this.props.itemName} className="ItemName" 
        style={{'text-decoration': "line-through"}}>
        {this.props.itemName}
      </span> : 
      <span title={this.props.itemName} className="ItemName" >
        {this.props.itemName}
      </span>;


    return (
      <li>
      <div className="TodoItem">
        {check}
        {name}
        <img alt="Remove" className="EditnRemove"
          src={removeIco_16} onClick={this.removeItem}></img>
        <img alt="Edit"className="EditnRemove"
          src={editIco_16}></img>
      </div>
      </li>
    );
  }
}

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.newItem = this.newItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.removeList = this.removeList.bind(this);
    this.checkItem = this.checkItem.bind(this);
  }
  
  newItem(e) {
    if (e.key === 'Enter') {
      this.props.onNewItem(this.props.idx, e.target.value);
      e.target.value="";
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

  render() {
    var ITEMs = this.props.items.map( (item, i) => 
      <TodoItem key={i} idx={i} 
        itemName={item.name} 
        itemDone={item.done}
        onRemoveItem={this.removeItem}
        onCheckItem={this.checkItem}/> );
    return (
      <span className="TodoList">
        <div className="ListTitle">
          <span className="ListName" title={this.props.listName}>
            {this.props.listName}
          </span>
          <img alt="Remove" className="EditnRemove" 
            src={removeIco_24} onClick={this.removeList}></img>
          <img alt="Edit"className="EditnRemove"
            src={editIco_24}></img>
        </div>
        <div style={{'margin-left':'5px','margin-bottom':'5px'}}> 
          New Item: <input type="text" onKeyPress={this.newItem}/> </div>
        {ITEMs}
      </span>
    );
  }
}

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoLists: [],
    };
    this.newItem = this.newItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.newList = this.newList.bind(this);
    this.removeList = this.removeList.bind(this);
    this.checkItem = this.checkItem.bind(this);
  }
  
  newItem(listIdx, itemName) {
    var lists = this.state.todoLists;
    lists[listIdx].items.push({name: itemName, done:false});
    this.setState({ todoLists: lists });
  }

  removeItem(listIdx, itemIdx) {
    var lists = this.state.todoLists;
    lists[listIdx].items.splice(itemIdx, 1);
    this.setState({ todoLists: lists });
  }

  newList(e) {
    if (e.key === 'Enter') {
      var lists = this.state.todoLists;
      lists.push({name: e.target.value, items: []});
      this.setState({ todoLists: lists });
      e.target.value="";
    }
  }

  removeList(listIdx) {
    var lists = this.state.todoLists;
    lists.splice(listIdx, 1);
    this.setState({ todoLists: lists });
  }

  checkItem(listIdx, itemIdx) {
    var lists = this.state.todoLists;
    lists[listIdx].items[itemIdx].done = lists[listIdx].items[itemIdx].done?
      false : true;
    this.setState({ todoLists: lists });
  }

  render() {
    var LISTs = this.state.todoLists.map( (list, i) => 
      <TodoList key={i} idx={i} 
        listName={list.name}
        items={list.items} 
        onNewItem={this.newItem}
        onRemoveItem={this.removeItem}
        onRemoveList={this.removeList}
        onCheckItem={this.checkItem}/>
    );
    return (
      <div>
        <div className="App">
          <h1>TODO APP</h1>
          <div> New List: <input type="text" onKeyPress={this.newList}/> </div>
        </div>
        <div className="App-header">
          {LISTs}
        </div>
      </div>
    );
  }

}

export default TodoApp;
