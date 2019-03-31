import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: ''
    }
    this.clickHandler = this.clickHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  componentDidMount() {
    console.log('component did mount')
    axios.get('/api/todos')
      .then((results) => {
        console.log('1st :', results.data);
        this.setState({ todos: results.data });
      })
      .catch((error) => {
        console.log('could not retrieve todos [client] :', error);
      })
  }

  changeHandler(e) {
    e.preventDefault();
    this.setState({ newTodo: e.target.value });
    // console.log('coming soon :', this.state.newTodo);
  }

  clickHandler(e) {
    e.preventDefault();
    console.log(this.state.newTodo);
    console.log('clicked', e.target);
  }

  render() {
    const listedTodos = this.state.todos.map(todo => (
      <tr>
        <td><li>{todo.text}</li></td>
        <td><p> => </p></td>
        <td><select value={todo.status}><option>{'planned'}</option><option>{'in progress'}</option><option>{'completed'}</option></select></td>
        <td><button onClick={this.deleteTodo}>Delete todo</button></td>
      </tr>
    ));
    return (
      <div>
        <h1>Todos List</h1>
        {/* <table> */}
        {/* <tr> */}
        <dt><input type='text' placeholder='add new todo' onChange={this.changeHandler} size='38'></input>
          <select><option>{'planned'}</option><option>{'in progress'}</option><option>{'completed'}</option></select>
          <button onClick={this.clickHandler}>Add todo</button>
        </dt>
        {/* </tr> */}
        {listedTodos}
        {/* </table> */}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
