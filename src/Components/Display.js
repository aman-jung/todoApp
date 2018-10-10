import React, { Component } from "react";
import ListItem from "./ListItem";

class Display extends Component {
  editTask = (i, newValue) => {
    this.props.editItem(i, newValue);
  };
  sendItem = i => {
    this.props.sendTasks(i);
  };

  render() {
    return (
      <div>
        <div>ToDO List</div>
        <ul>
          {this.props.items.map((item, index) => (
            <ListItem
              key={index}
              index={index}
              item={item}
              deleteItem={this.deleteItem}
              editTask={this.editTask}
              sendItem={this.sendItem}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Display;
