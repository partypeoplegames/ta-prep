import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: '',
      newStatus: 'planned',
      refresh: 0,
      revisedTodo: '',
      buttonState: 'Add todo',
      placeHolder: 'add new todo',
      selectedTodo: ''
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
    // if (e.target.id === 'changeStatus') {
    console.log(e.target.name);
    // const recentPick = 'changeStatus' + e.target.id;
    this.setState({ newStatus: e.target.value });
    // , () => {
    //   console.log(e.target.value);
    // });
    // document.getElementsByName("reviseButton").innerHTML = "update";
    // }
    // this.setState({ newStatus: document.getElementById("selectStatus").value })
  }

  clickHandler(e) {
    // e.preventDefault();
    if (e.target.id === 'addTodo' && this.state.newTodo !== '') {
      axios.post('/api/todos/add', { text: this.state.newTodo, status: this.state.newStatus })
        .catch('error adding todo at client')
    } else if (e.target.value === 'delete todo') {
      //DELETE SELECTED TODO
      axios.post('/api/todos/delete', { id: e.target.id })
        .catch('error adding todo at client')
    } else if (e.target.value === 'update todo') {
      axios.post('/api/todos/updatestatus', { id: e.target.id, status: this.state.newStatus })
        .catch('error adding todo at client')
    }
    // this.setState({ refresh: this.state.refresh++ })
  }

  revealTodoTextEditor(e) {
    if (docum)
  }

  selectTodo(e) {

  }

  render() {
    const pageRefresh = this.state.refresh;
    const updateTodoText = (
      <div>
        <input placeholder="enter revised todo text here"></input>
      </div>
    );
    const listedTodos = this.state.todos.map(todo => (
      // <form onSubmit={this.clickHandler} name='todos'>
      <ul>
        <span onClick={this.revealTodoTextEditor} type='text' placeholder={todo.text} onChange={this.changeHandler} size='38' value={this.state.revisedTodo} ><b>{todo.text}</b></span>
        <span>=>[status: {todo.status}]</span>
        <span hidden="true" id={todo.id} name='reviseTodoText'>{updateTodoText}</span>
        <td><input type='submit' id={todo.id} name='deleteButton' onClick={this.clickHandler} value='delete todo' /></td>
        <td><input type='submit' id={todo.id} name='updateButton' onClick={this.clickHandler} value='update todo' /></td>
      </ul>
    ));
    return (
      <div>
        <h1>Todos List</h1>
        <h3>this text field and dropdown menu can be used for any todo</h3>
        <form onSubmit={this.clickHandler}>
          <input type='text' placeholder={this.state.placeHolder} onChange={this.changeHandler} size='38' value={this.state.newTodo} />
          <select id='selectStatus' onChange={this.selectStatus}><option>{'planned'}</option><option>{'in progress'}</option><option>{'completed'}</option></select>
          <input type='submit' id='addTodo' onClick={this.clickHandler} value={this.state.buttonState} />
        </form>
        <form onSubmit={this.clickHandler} name='todos'>
          {listedTodos}
        </form>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
