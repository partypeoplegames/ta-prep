const mysql = require('mysql');
require('dotenv').config();

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB
})

conn.connect((err) => {
  if (err) console.log('could not connect to todos DB :', err);
  else console.log('connected to todos DB')
})

const addTodo = (req, cb) => {
  conn.query(`INSERT INTO todos (text, status) VALUES ('${req.body.text}', '${req.body.status}')`, (err) => {
    if (err) {
      console.log('could not add todo to todos DB :', err);
      cb(err);
    } else {
      console.log('successfully added todo in todos DB');
      cb(null);
    }
  })
}

const updateTodoStatus = (req, cb) => {
  conn.query(`UPDATE todos SET status = '${req.body.status}' WHERE (id=${req.body.id})`, (err, result) => {
    if (err) {
      console.log('could not revise todo in todos DB :', err);
      cb(err);
    } else {
      console.log('successfully revised todo in todos DB');
      cb(null, result);
    }
  })
}

const updateTodo = (req, cb) => {
  conn.query(`UPDATE todos SET text = '${req.body.text}', status = '${req.body.status}' WHERE (id=${req.body.id})`, (err, result) => {
    if (err) {
      console.log('could not revise todo in todos DB :', err);
      cb(err);
    } else {
      console.log('successfully revised todo in todos DB');
      cb(null, result);
    }
  })
}

const deleteTodo = (req, cb) => {
  conn.query(`DELETE FROM todos WHERE id = '${req.body.id}'`, (err) => {
    if (err) {
      console.log('could not delete todo in todos DB :', err);
      cb(err);
    } else {
      console.log('successfully deleted todo in todos DB');
      cb(null);
    }
  })
}

const getTodos = (cb) => {
  conn.query('SELECT * FROM todos', (err, result) => {
    if (err) {
      console.log('could not get todos from todos DB :', err);
      cb(err);
    } else {
      console.log('successfully pulled todos from todos DB');
      cb(null, result);
    }
  })
}

module.exports = { addTodo, updateTodoStatus, updateTodo, deleteTodo, getTodos };