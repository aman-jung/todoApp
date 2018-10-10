import React, { Component } from "react";

class Done extends Component {
  deleteItem = i => {
    this.props.delete(this.props.detail);
  };
  render() {
    return (
      <div>
        <li>
          <div>{this.props.detail}</div>
          <button onClick={this.deleteItem}>Delete</button>
        </li>
      </div>
    );
  }
}

export default Done;
