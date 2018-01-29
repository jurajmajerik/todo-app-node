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

## Dependencies

### Express.js

Express takes care of routing. Firstly, we import (&#39;require&#39;) it and store it in a constant _express._ The object being stored here is a function.

```JS
const express = require('express');
```

Express module which we require here exports to us a function. To gain access to all the methods that Express provides, we have to &#39;fire&#39; it and store it in a variable, commonly called _app_.

```JS
let app = express();
```

We now have access to the Express methods. For example, we can listen to requests on a certain port.

```JS
app.listen(3000);
```

### body-parser

Body-parser adds middleware that handles post data. This data is available under the _req.body_ property.

### Mongoose

Mongoose enables us to model application data of using a MongoDB database.

### EJS

EJS is a lightweight templating engine. It combines data and a template to produce HTML. Javascript within HTML is executed between &#39;&lt;% %&gt;&#39; tags.
