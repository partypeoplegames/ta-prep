import React from "react";
import ReactDOM from "react-dom";

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.clickHandler}>
          <input type='text' placeholder='add new todo' onChange={this.props.changeHandler} size='38' value={this.props.newTodo} />
          <select id='selectStatus' onChange={this.props.selectStatus}><option>{'planned'}</option><option>{'in progress'}</option><option>{'completed'}</option></select>
          <input type='submit' id='addTodo' onClick={this.props.clickHandler} value='Add todo' />
        </form>
      </div>
    )
  }
}