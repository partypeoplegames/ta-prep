const mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todos'
})

conn.connect((err) => {
  if (err) console.log('could not connect to todos DB :', err);
  else console.log('connected to todos DB')
})

const addTodo = (req, cb) => {
  conn.query(`INSERT INTO todos (text, status) VALUES ('${req.body.text}', '${req.body.status}')`, (err, result) => {
    if (err) {
      console.log('could not retrive todos from todos DB :', err);
      cb(err);
    } else {
      cb(result);
    }
  })
}

const reviseTodo = (req, cb) => {
  conn.query(`UPDATE todos SET text = '${req.body.text}', status = '${req.body.status}' WHERE (id=${req.body.id})`, (err, result) => {
    if (err) {
      console.log('could not retrive todos from todos DB :', err);
      cb(err);
    } else {
      cb(result);
    }
  })
}

const getTodos = (cb) => {
  conn.query('SELECT * FROM todos', (err, result) => {
    if (err) {
      console.log('could not retrive todos from todos DB :', err);
      cb(err);
    } else {
      cb(result);
    }
  })
}



module.exports = { addTodo, reviseTodo, getTodos };