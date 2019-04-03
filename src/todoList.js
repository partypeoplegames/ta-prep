import React from "react";
import ReactDOM from "react-dom";

export default class TodosList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const listedTodos = this.props.todos.map(todo => (
      <ul>
        <span><b>{todo.text}</b></span>
        <span>=>[status: {todo.status}]</span>
        <td><input type='submit' id={todo.id} name='deleteButton' onClick={this.props.clickHandler} value='delete todo' /></td>
        <td><input type='submit' id={todo.id} name='updateButton' onClick={this.props.clickHandler} value='update todo' /></td>
      </ul>
    ));
    return (
      <div>
        <form onSubmit={this.props.clickHandler} name='todos'>
          {listedTodos}
        </form>
      </div>
    )
  }

}