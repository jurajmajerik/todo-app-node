const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb://test:test@ds117868.mlab.com:17868/todo');

//Create a schema (a blueprint)
let todoSchema = new mongoose.Schema({
  item: String
});

let Todo = mongoose.model('Todo', todoSchema);

let urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {
  app.get('/todo', (req, res) => {
    //get data from mongoDB and pass it to view
    Todo.find({}, (err, data) => {
      if (err) throw (err);
      res.render('todo', {todos: data});
    });
  });

  app.post('/todo', urlencodedParser, (req, res) => {
    //get data from the view and add it to mongoDB
    let newTodo = Todo(req.body).save((err, data) => {
      if (err) throw (err);
      res.json(data);
    })
  });

  app.delete('/todo/:item', (req, res) => {
    //delete the requested item from mongoDB
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove((err, data) => {
      if (err) throw (err);
      res.json(data);
    });
  });
};
