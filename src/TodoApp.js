import React, { Component } from 'react';
import './App.css';
import TodoList from './TodoList';
import CountDisplay from './CountDisplay';

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'ALL',
      numDone: 0,
      numLeft: 0,
      todoLists: [],
    };
    this.newItem = this.newItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.newList = this.newList.bind(this);
    this.removeList = this.removeList.bind(this);
    this.checkItem = this.checkItem.bind(this);
    this.editList = this.editList.bind(this);
    this.editItem = this.editItem.bind(this);
    this.changeDisplay = this.changeDisplay.bind(this);
  }

  newItem(listIdx, itemName) {
    const lists = this.state.todoLists;
    lists[listIdx].items.push({ name: itemName, done: false });
    ++lists[listIdx].numLeft;
    this.setState({ numLeft: ++this.state.numLeft, todoLists: lists });
  }

  removeItem(listIdx, itemIdx) {
    const lists = this.state.todoLists;
    let Done = this.state.numDone;
    let Left = this.state.numLeft;
    if (lists[listIdx].items[itemIdx].done) {
      --lists[listIdx].numDone;
      --Done;
    } else {
      --lists[listIdx].numLeft;
      --Left;
    }
    lists[listIdx].items.splice(itemIdx, 1);
    this.setState({ numDone: Done, numLeft: Left, todoLists: lists });
  }

  newList(e) {
    if (e.key === 'Enter') {
      const lists = this.state.todoLists;
      lists.push({ name: e.target.value, numDone: 0, numLeft: 0, items: [] });
      this.setState({ todoLists: lists });
      e.target.value = '';
    }
  }

  removeList(listIdx) {
    const lists = this.state.todoLists;
    let Done = this.state.numDone;
    let Left = this.state.numLeft;
    Done -= lists[listIdx].numDone;
    Left -= lists[listIdx].numLeft;
    lists.splice(listIdx, 1);
    this.setState({ numDone: Done, numLeft: Left, todoLists: lists });
  }

  checkItem(listIdx, itemIdx) {
    const lists = this.state.todoLists;
    let Done = this.state.numDone;
    let Left = this.state.numLeft;
    if (lists[listIdx].items[itemIdx].done) {
      --lists[listIdx].numDone;
      ++lists[listIdx].numLeft;
      --Done;
      ++Left;
    } else {
      ++lists[listIdx].numDone;
      --lists[listIdx].numLeft;
      ++Done;
      --Left;
    }
    lists[listIdx].items[itemIdx].done = !lists[listIdx].items[itemIdx].done;
    this.setState({ numDone: Done, numLeft: Left, todoLists: lists });
  }

  editList(listIdx, listName) {
    const lists = this.state.todoLists;
    lists[listIdx].name = listName;
    this.setState({ todoLists: lists });
  }

  editItem(listIdx, itemIdx, itemName) {
    const lists = this.state.todoLists;
    lists[listIdx].items[itemIdx].name = itemName;
    this.setState({ todoLists: lists });
  }

  changeDisplay(e) {
    this.setState({ display: e.target.innerText });
  }

  render() {
    const display = this.state.display;
    const LISTs = this.state.todoLists.map((list, i) =>
      <TodoList
        key={i} idx={i}
        numDone={list.numDone}
        numLeft={list.numLeft}
        listName={list.name}
        items={list.items}
        onNewItem={this.newItem}
        onRemoveItem={this.removeItem}
        onRemoveList={this.removeList}
        onCheckItem={this.checkItem}
        onEditList={this.editList}
        onEditItem={this.editItem}
        display={display}
      />,
    );

    return (
      <div className="App">
        <div className="App-header">
          <h1>TODO APP</h1>
          <div className="DisplayDiv">
            <span
              className={(this.state.display === 'ALL') ?
              'DisplayButton DisplayButtonClicked' : 'DisplayButton'}
              onClick={this.changeDisplay}
            >ALL</span>
            <span
              className={(this.state.display === 'DONE') ?
              'DisplayButton DisplayButtonClicked' : 'DisplayButton'}
              onClick={this.changeDisplay}
            >DONE</span>
            <span
              className={(this.state.display === 'UNDONE') ?
              'DisplayButton DisplayButtonClicked' : 'DisplayButton'}
              onClick={this.changeDisplay}
            >UNDONE</span>
          </div>
          <input
            type="text" className="header" placeholder="Add New List"
            onKeyPress={this.newList}
          />
          <CountDisplay
            display={this.state.display}
            numDone={this.state.numDone} numLeft={this.state.numLeft}
          />
        </div>
        <div className="App-list">
          {LISTs}
        </div>
      </div>
    );
  }

}

export default TodoApp;
