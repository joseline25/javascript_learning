const http = require("http");
const express = require("express");

// imports express, which this time is a function that is used to create an express
// application stored in the app variable

const app = express();

// highlight-start
let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

// with Node.js

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' });
//   response.end(JSON.stringify(notes));
// });

// two routes defined to the application. The first one defines an event handler that
// is used to handle HTTP GET requests made to the application's / root

app.get("/", (request, response) => {
  response.send("<h1>Hi Jose!</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes); // (no need to stringify it is done with the method json)
});
// Express automatically sets the Content-Type header with the appropriate value
// of application/json
app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

// The event handler function accepts two parameters. The first request parameter
// contains all of the information of the HTTP request, and the second response parameter
// is used to define how the request is responded to.

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);

// Singular things, like notes in the case of our application, are called resources
// in RESTful thinking.

// Every resource has an associated URL which is the resource's unique address.
// One convention for creating unique addresses is to combine the name of the resource
// type with the resource's unique identifier.

// Let's assume that the root URL of our service is www.example.com/api.

// If we define the resource type of note to be notes, then the address of a note resource
// with the identifier 10, has the unique address www.example.com/api/notes/10.

// The URL for the entire collection of all note resources is www.example.com/api/notes.

/*

URL	             verb                   	functionality

notes/10       	 GET	                    fetches a single resource

notes	           GET	                    fetches all resources in the collection

notes	           POST	                    creates a new resource based on the request data

notes/10	       DELETE	                  removes the identified resource

notes/10	       PUT	                    replaces the entire identified resource
                                            with the request data

notes/10	       PATCH	                  replaces a part of the identified resource 
                                            with the request data

*/
