/*

 MongoDB—the database
 Express—the web framework
 Angular—the front-end framework (Angular is open source and backed by Google.)
 Node.js—the web server


 Introducing Express: The framework
Express is the E in MEAN. Because Node.js is a platform, it doesn’t prescribe how it
should be set up or used, which is one of its great strengths. But every time you create
websites and web applications, quite a few common tasks need doing. Express is a web
application framework for Node.js that’s designed to perform these tasks in a welltested,
 repeatable way.

 1- Easing your server setup


    Express sets up a web server to listen 
    to incoming requests and return relevant responses. In addition, it defines 
    a directory structure. 
    One folder is set up to serve static files in a nonblocking way; the last thing you
    want is for your application to have to wait when someone requests a CSS file! You
    could configure this yourself directly in Node.js, but Express does it for you.


 2 - Routing URLs to responses


    One of the great features of Express is that it provides a simple interface for
    directing an incoming URL to a certain piece of code. Whether this interface will
    serve a static HTML page, read from a database, or write to a database doesn’t matter.
    The interface is simple and consistent.


3 - Views: HTML responses

    It’s likely that you’ll want to respond to many of the requests to your application by
    sending some HTML to the browser. By now, it will come as no surprise to you that
    Express makes this task easier than it is in native Node.js.
    Express provides support for many templating engines that make it easier to build
    HTML pages in an intelligent way, using reusable components as well as data from
    your application. Express compiles these together and serves them to the browser as
    HTML.

4 - Remembering visitors with session support

    Being single-threaded, Node.js doesn’t remember a visitor from one request to the
    next. It doesn’t have a silo of RAM set aside for you; it sees only a series of HTTP
    requests. HTTP is a stateless protocol, so there’s no concept of storing a session state.
    As it stands, it’s difficult to create a personalized experience in Node.js or have a
    secure area where a user has to log in; it’s not much use if the site forgets who you are
    on every page. You can do it, of course, but you have to code it yourself.
    You’ll never guess what: Express has an answer to this problem too! Express can
    use sessions so that you can identify individual visitors through multiple requests and
    pages. Thank you, Express!



Introducing MongoDB: The database


The ability to store and use data is vital for most applications. In the MEAN stack, the
database of choice is MongoDB, the M in MEAN. MongoDB fits into the stack incredibly well.
Like Node.js, it’s renowned for being fast and scalable.


MongoDB stores documents as BSON, which is binary JSON (JavaScript Serialized
Object Notation). Don’t worry for now if you’re not fully familiar with JSON; check
out the relevant section in appendix D. In short, JSON is a JavaScript way of holding
data, which is why MongoDB fits so well into the JavaScript-centric MEAN stack!

{
"firstName" : "Simon",
"lastName" : "Holmes",
_id : ObjectId("52279effc62ca8b0c1000007")
}

The _id entity is a unique identifier
that MongoDB assigns to any new document when it’s created.

MongoDB , has the capability to perform multidocument transactions with
ACID (atomicity, consistency, isolation, durability) guarantees.


Mongoose for data modeling and more

MongoDB’s flexibility in what it stores in documents is a great thing for the database.
But most applications need some structure to their data. Note that the application
needs structure, not the database. So where does it make most sense to define the
structure of your application data? In the application itself!
To this end, the company behind MongoDB created Mongoose. In the company’s
words, Mongoose provides “elegant MongoDB object modeling for Node.js” (https://
mongoosejs.com).


Install the MEAN Stack

1 - Node 

    download it and install it. It will also install npm
    check the version with 

    node --version
    npm --version

2 - Express

    To install it globally, 

    npm install -g express-generator

    check the version with 

    express --version

    npm install express --save


3 - Mongo DB

    check the version

    mongod --version



4 - Installing Angular

    Angular is simple to install as long as you have Node and npm already installed.
    What you actually install is the Angular CLI as a global npm package. 
    To do so, run the following command in terminal:

    npm install -g @angular/cli

To save a package in the dependencies 

npm install --save package-name


To get the structure of the framework express, type the command

express

This command installs the framework with default settings in your current folder.

You get the following folders : 

bin
public
routes
views


 the HTML template engine is Jade   

 Pour run l'application myapp,

  SET DEBUG=myapp:* & npm start


myapp:server Listening on port 3000 +0ms

http://127.0.0.1:3000/



Pour simplifier l'execution de mon projet, 

npm install -g nodemon


When the installation is finished, you’ll be able to use nodemon wherever you want.
Using it is simple. Instead of typing node to start the application, you type nodemon.

nodemon


5 - Utilities

Installing Docker
With this edition, we include the capability to run the application against a local
Docker environment. The eagle-eyed among you probably noticed the Docker files in
the repo.

https://www.docker.com/products/docker-desktop


To run the application in the container, navigate to the cloned repo, and 
type
 make build .
 Each branch has a Docker file that sets up an environment suitable to run that
chapter’s code in. If you need to bring the containers down, use 
make destroy.
If you want to run the code locally without Docker, that’s cool too

install make following the instructions on this link


https://bobbyhadz.com/blog/make-is-not-recognized-as-internal-or-external-command#:~:text=The%20error%20%22'make'%20is,Search%20bar%20and%20type%20PowerShell.


*/
