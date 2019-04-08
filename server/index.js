const express = require("express");
const bodyParser = require("body-parser");
// const request = require("request");
const db = require("../database/index");
const router = require('./routes')

const app = express();

//Parse json and x-ww-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", express.static("dist"));
// app.use(require('./routes'));

app.post("/api/todos/add", (req, res) => {
  db.addTodo(req, (error) => {
    if (error) {
      res.end()
    }
    res.status(201).send()
  })
});

app.post("/api/todos/updatestatus", (req, res) => {
  db.updateTodoStatus(req, (error) => {
    if (error) {
      res.end()
    }
    res.status(201).send()
  })
});

app.post("/api/todos/updatetodo", (req, res) => {
  db.updateTodo(req, (error) => {
    if (error) {
      res.end()
    }
    res.status(201).send()
  })
});

app.post("/api/todos/delete", (req, res) => {
  db.deleteTodo(req, (error) => {
    if (error) {
      res.end()
    }
    res.status(201).send()
  })
});

app.get("/api/todos", (req, res) => {
  db.getTodos((error, data) => {
    if (error) {
      console.log('could not retrieve todos at server :', error);
      res.end();
    }
    res.send(data);
  });
});

// app.use('api/todos/add', router);
// app.use('api/todos/updatestatus', router);
// app.use('api/todos/updatetodo', router);
// app.use('api/todos/delete', router);
// app.use('api/todos', router);

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => console.log(`Now listening on port ${PORT}!`));