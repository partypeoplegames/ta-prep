import React from "react";

const TodosList = (props) => {

  const listedTodos = props.todos.map(todo =>
    <ul>
      <span><b>{todo.text}</b></span>
      <span>=>[status: {todo.status}]</span>
      <td><input type='submit' id={todo.id} name='deleteButton' onClick={props.clickHandler} value='delete todo' /></td>
      <td><input type='submit' id={todo.id} name='updateButton' onClick={props.clickHandler} value='update todo' /></td>
    </ul>
  );
  return (
    <div>
      <form onSubmit={props.clickHandler} name='todos'>
        {listedTodos}
      </form>
    </div>
  )

}

export default TodosList