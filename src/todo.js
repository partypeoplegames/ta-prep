import React from "react";

const Todo = (props) => {

  return (
    <div>
      <form onSubmit={props.clickHandler}>
        <input type='text' placeholder='add new todo' onChange={props.changeHandler} size='38' value={props.newTodo} />
        <select id='selectStatus' onChange={props.selectStatus}>
          <option>{'planned'}</option>
          <option>{'in progress'}</option>
          <option>{'completed'}</option>
        </select>
        <input type='submit' id='addTodo' onClick={props.clickHandler} value='Add todo' />
      </form>
    </div>
  )
}

export default Todo