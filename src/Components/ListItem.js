import React, { Component } from "react";
import "./App.css";

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }

  updateItem = event => {
    event.preventDefault();
    this.props.editTask(this.props.index, this.input.value);
    this.setState(state => {
      state.editing = false;
      return state;
    });
  };

  sendingTasks = i => {
    this.props.sendItem(this.props.index);
  };

  renderForm = () => {
    return (
      <form onSubmit={this.updateItem}>
        <input
          type="text"
          ref={value => {
            this.input = value;
          }}
          defaultValue={this.props.item.name}
        />
        <button type="submit">Update Items</button>
      </form>
    );
  };

  toggleItem = () => {
    this.setState({
      editing: true
    });
  };

  renderItem = () => {
    // console.log(this.props.item.completed);
    return (
      <li>
        <div
          className={this.props.item.completed ? "completed" : "notcompleted"}
        >
          <span>{this.props.item.name}</span>

          <div className="dropdown" style={{ marginRight: "10px" }}>
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              data-toggle="dropdown"
            >
              <span className="caret" />
            </button>
            <ul className="dropdown-menu">
              <li onClick={this.toggleItem}>Edit Task</li>
              <li onClick={this.sendingTasks}>Send To Done</li>
            </ul>
          </div>
        </div>
      </li>
    );
  };
  render() {
    const { editing } = this.state;
    return <section>{editing ? this.renderForm() : this.renderItem()}</section>;
  }
}

export default ListItem;
