import React, { Component } from "react";
import "./App.css";
import Display from "./Display";
import Done from "./Done";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTasks: "",
      tasks: []
    };
  }

  componentWillUpdate = (nextProps, nextState) => {
    localStorage.setItem("tasks", JSON.stringify(nextState.tasks));
  };

  componentDidMount() {
    // let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (localStorage.getItem("tasks")) {
      // let item = tasks.filter(task => task.completed === true);
      localStorage.getItem("tasks") &&
        this.setState({
          tasks: JSON.parse(localStorage.getItem("tasks"))
        });
    }
  }

  onChange = e => {
    let currentTasks = e.target.value;
    this.setState(state => {
      state.currentTasks = currentTasks;
      return state;
    });
  };

  onSubmit = e => {
    e.preventDefault();
    var tasks = this.state.tasks;
    var currentTasks = this.state.currentTasks;
    if (this.state.currentTasks) {
      tasks.push({ name: currentTasks, completed: false });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      this.setState(state => {
        state.tasks = tasks;
        state.currentTasks = "";
        return state;
      });
    }
  };

  delete = name => {
    console.log(name);
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.filter(item => item.name !== name);
    this.setState({ tasks });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  editItem = (index, newValue) => {
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    var task = tasks[index];
    task["name"] = newValue;
    task.completed = false;
    this.setState(state => {
      state.tasks = tasks;
      return state;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  sendTasks = i => {
    let tasks = this.state.tasks;
    let task = tasks[i];
    task.completed = !tasks.completed;
    // tasks.push({ name: task.name, completed: task.completed });
    this.setState(state => {
      return state.tasks;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  render() {
    return (
      <div className="todo">
        <div className="header">
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              placeholder="task"
              onChange={this.onChange}
              value={this.state.currentTasks}
            />
            <button type="submit" value="submit">
              Add
            </button>
          </form>

          <Display
            items={this.state.tasks}
            editItem={this.editItem}
            sendTasks={this.sendTasks}
          />
          <ul className="TodoList">
            <h2>Done</h2>
            {this.state.tasks
              .filter(item => item.completed === true)
              .map((item, i) => {
                return (
                  <Done
                    detail={item.name}
                    index={i}
                    key={i}
                    delete={this.delete}
                  />
                );
              })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
