const express = require('express');
const router = express.Router();

router.post("/api/todos/add", (req, res) => {
  db.addTodo(req, (error) => {
    if (error) {
      res.end()
    }
    res.status(201).send()
  })
});

router.post("/api/todos/updatestatus", (req, res) => {
  db.updateTodoStatus(req, (error) => {
    if (error) {
      res.end()
    }
    res.status(201).send()
  })
});

router.post("/api/todos/updatetodo", (req, res) => {
  db.updateTodo(req, (error) => {
    if (error) {
      res.end()
    }
    res.status(201).send()
  })
});

router.post("/api/todos/delete", (req, res) => {
  db.deleteTodo(req, (error) => {
    if (error) {
      res.end()
    }
    res.status(201).send()
  })
});

router.get("/api/todos", (req, res) => {
  db.getTodos((error, data) => {
    if (error) {
      console.log('could not retrieve todos at server :', error);
      res.end();
    }
    res.send(data);
  });
});

// // router.use('/api', require('./api.v0.js'));

// // router.get('/', (req, res) => {
// //   res.send('test route')
// // })

module.exports = router;