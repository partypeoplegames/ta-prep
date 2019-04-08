import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Todo from './todo';
import TodosList from './todoList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: '',
      newStatus: 'planned',
      learn: 'true'
    }
    this.clickHandler = this.clickHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.selectStatus = this.selectStatus.bind(this);
    this.learn = this.learn.bind(this);
  }

  componentDidMount() {
    axios.get('/api/todos')
      .then((results) => {
        this.setState({ todos: results.data }, () => {
        });
      })
      .catch('error on GET from client');
  }

  changeHandler(e) {
    e.preventDefault();
    this.setState({ newTodo: e.target.value });
  }

  selectStatus(e) {
    e.preventDefault();
    this.setState({ newStatus: e.target.value });
  }

  clickHandler(e) {
    // e.preventDefault();
    // console.log("eti :", e.target.id)
    // console.log('etv :', e.target.value)
    if (e.target.id === 'addTodo' && this.state.newTodo !== '') {
      axios.post('/api/todos/add', { text: this.state.newTodo, status: this.state.newStatus })
        .catch('error adding todo at client')
    } else if (e.target.value === 'delete todo') {
      //DELETE SELECTED TODO
      axios.post('/api/todos/delete', { id: e.target.id })
        .catch('error adding todo at client')
    } else if (e.target.value === 'update todo' && this.state.newTodo === '') {
      axios.post('/api/todos/updatestatus', { id: e.target.id, status: this.state.newStatus })
        .catch('error updating todo status at client')
    } else if (e.target.value === 'update todo' && this.state.newTodo !== '') {
      axios.post('/api/todos/updatetodo', { id: e.target.id, text: this.state.newTodo, status: this.state.newStatus })
        .catch('error updating todo text adn status at client')
    }
  }

  learn() {
    // e.preventDefault();
    if (this.state.learn === 'true') this.setState({ learn: 'false' }, () => {
      alert("learn button clicked :", this.state.learn)
    });
    else this.setState({ learn: 'true' }, () => {
      alert("learn updated :", this.state.learn)
    });
  }

  render() {

    return (
      <div>
        <h1 onclick={() => console.log('clicked the header')}>Todos List</h1>
        <h4>this text field and dropdown menu can be used for any todo</h4>
        <Todo clickHandler={this.clickHandler} changeHandler={this.changeHandler} newTodo={this.state.newTodo} selectStatus={this.selectStatus} />
        <TodosList todos={this.state.todos} clickHandler={this.clickHandler} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));