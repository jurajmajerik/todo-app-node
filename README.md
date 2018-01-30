## Introduction

Understanding the inner workings of this app took some effort. Therefore, I decided to write it up here.

## Layout

The app uses the Model-View-Controller architecture pattern.

**Model** defines data structure and updates application state to reflect added

items.

**View** defines user interface (UI) and receives updates from Model.

**Controller** contains control logic, e.g receives update from View and then

notifies Model to &#39;add item&#39;.

## Basic Concepts

**Routing** determines how an application responds to a client request. A request points to a particular endpoint on a path (URI) and has a specific HTTP request method (GET, POST, ADD or DELETE). When a route is matched, one or more handler functions are executed.

**Middleware** functions are functions that have access to the **request** object (req), the **response** object (res) and the **next** function. These functions can execute any code, make changes to the request and response objects, end the request-response cycle or call the next middleware function in the stack.

**Request object** (req) represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers and others.

**Response object** (res) represents the HTTP response that an Express app sends when it receives an HTTP request.

The **next** function executes the middleware function succeeding the current middleware function.

**Database Model** determines the logical structure of a database. In MongoDB context, Model is a constructor function (based on Schema from which it was compiled). Model handles all document creation and retrieval.

**Documents** are instances of a Model. They can be saved and retrieved from a database.

## Dependencies

### Express.js

Express runs between the server created by Node.js and the front-end page of the app. It also takes care of routing.

Mount middleware for any type of HTTP request on the given path:

```JS
app.use('/user', (req, res, next) => {
	console.log('Request type: ', req.method);
});
```

Mount middleware for a specific type of HTTP request on the given path:

```JS
app.get('/user', (req, res, next) => {
	res.send('USER');
});
```

Setting properties of the _app_ object:

```JS
app.set('view engine', 'ejs');
```

### body-parser

Body-parser adds middleware that handles post data. This data is available under the _req.body_ property.

### Mongoose

Mongoose enables us to model application data of using a MongoDB database.

### EJS

EJS is a lightweight templating engine. It combines data and a template to produce HTML. Javascript within HTML is executed between &#39;&lt;% %&gt;&#39; tags.

## APP.JS

Firstly, we import (&#39;require&#39;) it and store it in a constant _express._ The object being stored here is a function.

```JS
const express = require('express');
```

We also need to require our controller file and store it in a constant _todoController._

```JS
const todoController = require('./controllers/todoController');
```

Express module which we required above exports to us a function. To gain access to all the methods that Express provides, we have to &#39;fire&#39; it and store it in a variable, commonly called _app_.

```JS
let app = express();
```

Set up the chosen templating engine:

```JS
app.set('view engine', 'ejs');
```

Serve static files using a built-in middleware _express.static_:

```JS
app.use(express.static('./public'));
```

The controller file was exported to app.js as a function. Fire it, passing in the app object:

```JS
todoController(app);
```

Call the listen method on the app object, passing in the port number as argument:

```JS
app.listen(3000);
```

## TODOCONTROLLER.JS

First we require body-parser for handling our POST requests and Mongoose for modeling database.

```JS
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
```

### Database Modeling: MongoDB & Mongoose

We connect our MongoDB database hosted on mLab:

```JS
mongoose.connect('mongodb://test:test@ds117868.mlab.com:17868/todo');
```
The central object of Mongoose is Schema. Let's create an instance of this object and define how the data in our schema will be organized. We store this in the variable __todoSchema__.

```JS
let todoSchema = new mongoose.Schema({
	item: String
})
```

Now we compile our schema into a Model and store our Model in the variable __Todo__. The first argument is the **singular name of the collection the model is for**. Mongoose automatically looks for the plural version of the model name (e.g. __Todos__).

__Todo__ is our constructor for creating Documents. Each document will have 1 property __item__ of type String as declared in our schema.

```JS
let Todo = mongoose.model('Todo', todoSchema);
```
New documents can be submitted to the database using the .save() method. This will be used when handling POST requests.

```JS
let newTodo = Todo(req.body).save(function(err, data) {
	if (err) throw err;
	res.json(data);
	// Explain res.json and the argument
})
```

Database can be queried using the .find() method. This will be used when handling GET requests.

```JS
Todo.find({}, function(err, data) {
	if (err) throw (err);
	res.render('todo', {todos: data});
	// Explain render request and the above arguments
});
```

Documents can be removed from the database using the .remove() method. This will be used when handling DELETE requests.

```JS
Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data) {
	if (err) throw (err);
	res.json(data);
	// Explain res.json and the argument
	// Explain the RegEx above
});
```


### Main Module

Three URL methods are defined here – GET, POST and DELETE which are wrapped in a single function and exported for use in _app.js_.

## TODO.EJS

An html form is created. Within the form is an unordered list which is populated dynamically based on items present in todos database(\*clarify how this data is being exported from mLab via Mongoose).

```HTML
<div id="todo-table">
      <form>
        <input type="text" name="item" placeholder="Add new item..." required>
        <button type="submit">Add Item</button>
      </form>
      <ul>
        <% for(let i = 0; i < todos.length; i++) { %>
          <li><%= todos[i].item %></li>
        <% } %>
      </ul>
</div>
```

## TODO-LIST.JS

Here, POST and DELETE requests are submitted.

All the code is wrapped within .ready function to make sure the entire DOM is loaded before the JavaSript code.

The Ajax request for POST request is submitted upon &#39;submit&#39; event on the &#39;form&#39; element.

The Ajax request for DELETE request is submitted upon &#39;click&#39; event on a &#39;li&#39; element.
