import React, { Component } from 'react';
import './App.css';
import removeIco_24 from './remove_24.png';
import removeIco_16 from './remove_16.png';
import editIco_24 from './edit_24.png';
import editIco_16 from './edit_16.png';
import checkboxIco from './checkbox.png';
import checkIco from './check.png';

class CountDisplay extends Component {
  render() {
    return (
      <div>
        {(this.props.display=="ALL" || this.props.display=="DONE")?
          <span className="Count"> Done &#58; {this.props.numDone}</span>:null}
        {(this.props.display=="ALL" || this.props.display=="UNDONE")?
          <span className="Count"> Left &#58; {this.props.numLeft}</span>:null}
      </div>
    );
  }
}

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
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
    this.setState({ edit: true });
  }

  editItem(e) {
    if (e.key === 'Enter') {
      this.props.onEditItem(this.props.idx, e.target.value);
      this.setState({edit: false});
    } 
  }
  
  render() {
    var done = this.props.itemDone;

    var checkBox = done?
      <img alt="done" className="CheckBox"
        src={checkIco} onClick={this.checkItem}/> :
      <img alt="undone" className="CheckBox"
        src={checkboxIco} onClick={this.checkItem}/>;

    var itemTitle = this.state.edit?  
      <span className="ItemName">
        <input type="text" className="edit" defaultValue={this.props.itemName}
          onKeyPress={this.editItem}/>
      </span> : done?
      <span title={this.props.itemName} className="ItemName Done"
        onClick={this.checkItem}>
        {this.props.itemName}
      </span> : 
      <span title={this.props.itemName} className="ItemName" 
        onClick={this.checkItem}>
        {this.props.itemName}
      </span>;
    
    return (
      <div className="TodoItem">
        {checkBox}
        {itemTitle}
        <img alt="Remove" className="EditnRemove Trans-down"
          src={removeIco_16} onClick={this.removeItem}></img>
        <img alt="Edit"className="EditnRemove Trans-down"
          src={editIco_16} onClick={this.clickEdit}></img>
      </div>
    );
  }
}

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
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

  clickEdit() {
    this.setState({edit: true});
  }

  editList(e) {
    if (e.key === 'Enter') {
      this.props.onEditList(this.props.idx, e.target.value);
      this.setState({edit: false});
    } 
  }

  editItem(itemIdx, itemName) {
    this.props.onEditItem(this.props.idx, itemIdx, itemName);
  }

  render() {
    var display = this.props.display;

    var ITEMs = (display=="ALL")?
      this.props.items.map( (item, i) => 
      <TodoItem key={i} idx={i} 
        itemName={item.name} 
        itemDone={item.done}
        onRemoveItem={this.removeItem}
        onCheckItem={this.checkItem}
        onEditItem={this.editItem}/> ) : (display=="DONE")?
        this.props.items.map( (item, i) => item.done?
          <TodoItem key={i} idx={i} 
            itemName={item.name} 
            itemDone={item.done}
            onRemoveItem={this.removeItem}
            onCheckItem={this.checkItem}
            onEditItem={this.editItem}/> :null ) :
            this.props.items.map( (item, i) => !item.done?
              <TodoItem key={i} idx={i} 
                itemName={item.name} 
                itemDone={item.done}
                onRemoveItem={this.removeItem}
                onCheckItem={this.checkItem}
                onEditItem={this.editItem}/> :null );

    var listTitle = this.state.edit?
      <span className="ListName">
        <input type="text" className="edit" defaultValue={this.props.listName}
          onKeyPress={this.editList}/>
      </span> :
      <span className="ListName" title={this.props.listName}>
        {this.props.listName}
      </span>

    return (
      <span className="ListBackground">
        <div className="ListTitle">
          {listTitle}
          <img alt="Remove" className="EditnRemove" 
            src={removeIco_24} onClick={this.removeList}></img>
          <img alt="Edit"className="EditnRemove"
            src={editIco_24} onClick={this.clickEdit}></img>
        </div>
        <div style={{marginLeft:'5px',marginBottom:'5px'}}> 
          {(this.props.display!="DONE")?
            <input type="text" placeholder="Add New Item"
              onKeyPress={this.newItem}/>:null}
        </div>
        <span className="TodoList ScrollBar">
          {ITEMs}
        </span>
        <div className="ListCount">
          <CountDisplay display={this.props.display} 
            numDone={this.props.numDone} numLeft={this.props.numLeft}/>
        </div>
      </span>
    );
  }
}

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "ALL",
      numDone: 0,
      numLeft: 0,
      todoLists: []
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
    var lists = this.state.todoLists;
    lists[listIdx].items.push({name: itemName, done:false});
    ++lists[listIdx].numLeft;
    this.setState({ numLeft: ++this.state.numLeft, todoLists: lists });
  }

  removeItem(listIdx, itemIdx) {
    var lists = this.state.todoLists;
    var Done = this.state.numDone;
    var Left = this.state.numLeft;
    if(lists[listIdx].items[itemIdx].done) {
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
      var lists = this.state.todoLists;
      lists.push({name: e.target.value, numDone: 0, numLeft: 0, items: []});
      this.setState({ todoLists: lists });
      e.target.value="";
    }
  }

  removeList(listIdx) {
    var lists = this.state.todoLists;
    var Done = this.state.numDone;
    var Left = this.state.numLeft;
    Done-=lists[listIdx].numDone;
    Left-=lists[listIdx].numLeft;
    lists.splice(listIdx, 1);
    this.setState({ numDone: Done, numLeft: Left, todoLists: lists });
  }

  checkItem(listIdx, itemIdx) {
    var lists = this.state.todoLists;
    var Done = this.state.numDone;
    var Left = this.state.numLeft;
    if(lists[listIdx].items[itemIdx].done) {
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
    var lists = this.state.todoLists;
    lists[listIdx].name = listName;
    this.setState({ todoLists: lists });
  }

  editItem(listIdx, itemIdx, itemName) {
    var lists = this.state.todoLists;
    lists[listIdx].items[itemIdx].name = itemName;  
    this.setState({ todoLists: lists });
  }

  changeDisplay(e) {
    console.log(e.target.innerText);
    this.setState({ display: e.target.innerText });
  }

  render() {
    var display = this.state.display;
    var LISTs = this.state.todoLists.map( (list, i) =>
      <TodoList key={i} idx={i}
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
        display={display}/>
    );
    
    return (
      <div className="App">
        <div className="App-header">
          <h1>TODO APP</h1>
          <div className="DisplayDiv">
            <span className={(this.state.display=="ALL")?
              "DisplayButton DisplayButtonClicked":"DisplayButton"}
              onClick={this.changeDisplay}>ALL</span>
            <span className={(this.state.display=="DONE")?
              "DisplayButton DisplayButtonClicked":"DisplayButton"}
              onClick={this.changeDisplay}>DONE</span>
            <span className={(this.state.display=="UNDONE")?
              "DisplayButton DisplayButtonClicked":"DisplayButton"}
              onClick={this.changeDisplay}>UNDONE</span>
          </div>
          <input type="text" className="header" placeholder="Add New List"
            onKeyPress={this.newList}/>
          <CountDisplay display={this.state.display}
            numDone={this.state.numDone} numLeft={this.state.numLeft}/>
        </div>
        <div className="App-list">
          {LISTs}
        </div>
      </div>
    );
  }

}

export default TodoApp;
