import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: '',
      newStatus: '',
      refresh: 0,
      revisedTodo: ''
    }
    this.clickHandler = this.clickHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.selectStatus = this.selectStatus.bind(this);
  }

  componentDidMount() {
    axios.get('/api/todos')
      .then((results) => {
        this.setState({ todos: results.data });
      })
      .catch('error on GET from client');
  }

  changeHandler(e) {
    // e.preventDefault();
    this.setState({ newTodo: e.target.value, newStatus: document.getElementById("selectStatus").value });
  }

  selectStatus(e) {
    // e.preventDefault();
    this.setState({ newStatus: document.getElementById("selectStatus").value })
  }

  clickHandler(e) {
    // e.preventDefault();
    if (e.target.id === 'addTodo' && this.state.newTodo !== '') {
      axios.post('/api/todos/add', { text: this.state.newTodo, status: this.state.newStatus })
        .catch('error adding todo at client')
    } else {
      //DELETE SELECTED TODO
      axios.post('/api/todos/delete', { id: e.target.id })
        .catch('error adding todo at client')
    }
    // this.setState({ refresh: this.state.refresh++ })
  }

  render() {
    const pageRefresh = this.state.refresh;
    const listedTodos = this.state.todos.map(todo => (
      <form onSubmit={this.clickHandler}>
        <td><h3 type='text' placeholder={todo.text} onChange={this.changeHandler} size='38' value={this.state.revisedTodo} >{todo.text}</h3></td>
        <td><p> => </p></td>
        <td><p>status: {todo.status}</p></td>
        {/* <td><select value={todo.status}><option>{'planned'}</option><option>{'in progress'}</option><option>{'completed'}</option></select></td> */}
        <td><input type='submit' id={todo.id} onClick={this.clickHandler} value='delete todo' /></td>
      </form>
    ));
    return (
      <div>
        <h1>Todos List</h1>
        <form onSubmit={this.clickHandler}>
          <input type='text' placeholder='add new todo' onChange={this.changeHandler} size='38' value={this.state.newTodo} />
          <select id='selectStatus' onChange={this.selectStatus}><option>{'planned'}</option><option>{'in progress'}</option><option>{'completed'}</option></select>
          <input type='submit' id='addTodo' onClick={this.clickHandler} value='Add todo' />
        </form>
        {listedTodos}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
