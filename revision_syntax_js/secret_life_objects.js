/*

    Encapsulation
The core idea in object-oriented programming is to divide programs
into smaller pieces and make each piece responsible for managing its
own state.
This way, some knowledge about the way a piece of the program
works can be kept local to that piece. Someone working on the rest
of the program does not have to remember or even be aware of that
knowledge. Whenever these local details change, only the code directly
around it needs to be updated.
Different pieces of such a program interact with each other through
interfaces, limited sets of functions or bindings that provide useful 
functionality at a more abstract level, hiding their precise implementation.
Such program pieces are modeled using objects. Their interface consists of 
a specific set of methods and properties. Properties that are
part of the interface are called public. The others, which outside code
should not be touching, are called private.


Many languages provide a way to distinguish public and private properties
and prevent outside code from accessing the private ones altogether. 
JavaScript, once again taking the minimalist approach, does
not—not yet at least. There is work underway to add this to the language.
Even though the language doesn’t have this distinction built in,
JavaScript programmers are successfully using this idea.


Typically,
the available interface is described in documentation or comments. It
is also common to put an underscore (_) character at the start of property names to indicate that those properties are private.
Separating interface from implementation is a great idea. It is usually
called encapsulation.
*/

/*
    Methods

*/

let rabbit = {}; // the object

// déclaration de la methode speak sur l'objet rabbit

rabbit.speak = function (line) {
  console.log(`The rabbit says '${line}'`);
};
rabbit.speak("I'm alive."); // The rabbit says 'I'm alive.'

// also

/*
    Usually a method needs to do something with the object it was called
on. When a function is called as a method—looked up as a property
and immediately called, as in object.method()—the binding called this
in its body automatically points at the object that it was called on.

*/

function speak(line) {
  console.log(`The ${this.type} rabbit says '${line}'`); // note the use of the keyword this
}
let whiteRabbit = { type: "white", speak }; // object whiteRabbit with the attribute type
let hungryRabbit = { type: "hungry", speak };
whiteRabbit.speak("Oh my ears and whiskers, " + "how late it's getting!");

/*

    Since each function has its own this binding, whose value depends
on the way it is called, you cannot refer to the this of the wrapping
scope in a regular function defined with the function keyword.

    Arrow functions are different—they do not bind their own this but
can see the this binding of the scope around them. Thus, you can do
something like the following code, which references this from inside a
local function



*/

function normalize() {
  console.log(this.coords.map((n) => n / this.length));
}
normalize.call({ coords: [0, 2, 3], length: 5 });

let vector = { coords: [1, 3, 4], length: 6 };
normalize.call(vector); // I cannot call it with vector.normalize()

// Prototypes

let empty = {};
console.log(empty.toString);
console.log(empty.toString());

/*

   In addition to their set of properties,
most objects also have a prototype. A prototype is another object that
is used as a fallback source of properties. When an object gets a request
for a property that it does not have, its prototype will be searched for
the property, then the prototype’s prototype, and so on.
So who is the prototype of that empty object? It is the great ancestral
prototype, the entity behind almost all objects, Object.prototype.


As you guess, Object.getPrototypeOf returns the prototype of an object.


The prototype relations of JavaScript objects form a tree-shaped
structure, and at the root of this structure sits Object.prototype. 


You can use Object.create to create an object with a specific prototype.


*/

let protoRabbit = {
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  },
};

// let create another object and set its prototype to the protoRabbit

let killerRabbit = Object.create(protoRabbit);

// killerRabbit has now the property type and the method speak
killerRabbit.type = "killer";
killerRabbit.speak("SKREEEE!");

// Classes

/*


JavaScript’s prototype system can be interpreted as a somewhat informal take on an object-oriented concept called classes. A class defines
the shape of a type of object—what methods and properties it has.
Such an object is called an instance of the class.


When to use classes and when to use prototypes (object.create) to derive a new object?


Prototypes are useful for defining properties for which all instances of
a class share the same value, such as methods. Properties that differ per
instance, such as our rabbits’ type property, need to be stored directly
in the objects themselves.


So to create an instance of a given class, you have to make an object
that derives from the proper prototype, but you also have to make sure
it, itself, has the properties that instances of this class are supposed to
have. 

This is what a constructor function does.


*/

// this is a constructor

function makeRabbit(type) {
  let rabbit = Object.create(protoRabbit);
  rabbit.type = type;
  return rabbit;
}

let joseline = makeRabbit("sexy");

console.log(joseline.speak("YESSSSSSS!!"));
// The sexy rabbit says 'YESSSSSSS!!'

// on vient de créer un objet de prototype protoRabbit avec ce constructeur archaique

/*

  JavaScript provides a way to make defining this type of function
easier. If you put the keyword new in front of a function call, the function
is treated as a constructor. 

 This means that an object with the right
prototype is automatically created, bound to "this" in the function, and
returned at the end of the function.

The prototype object used when constructing objects is found by
taking the "prototype" property of the constructor function.
*/

function Rabbitc(type) {
  this.type = type;
}
Rabbitc.prototype.speak = function (line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
};
let weirdRabbit = new Rabbitc("weird");
console.log(weirdRabbit.speak("Ashhhh!"));

/*
  By convention, the names of constructors are capitalized so that they
can easily be distinguished from other functions.




Class notation
So JavaScript classes are constructor functions with a prototype property. That is how they work, and until 2015, that was how you had to
write them. These days, we have a less awkward notation.


*/

class Rabbit {
  // definition du constructeur
  constructor(type) {
    this.type = type;
  }
  // definition d'une méthode
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
}

let killRabbit = new Rabbit("killer");
let blackRabbit = new Rabbit("black");

console.log(killRabbit.speak("Nooooo!!"));
console.log(blackRabbit.speak("I'm dark!"));

class Student {
  // définition du constructeur
  constructor(name, age, school) {
    this.name = name;
    this.age = age;
    this.school = school;
  }

  // définition de quelques méthodes
  presentation() {
    console.log(
      "je m'appelle ".concat(
        this.name,
        " ",
        "j'ai ",
        this.age,
        " ",
        "et je fréquente à l'école ",
        this.school,
        "."
      )
    );
  }

  myFuture() {
    console.log(this.age + 5);
  }
}

// instanciation de la nouvelle classe

let studentOne = new Student("Joseline", 30, "Cassitech academy");

// appel des méthodes de la classe sur l'objet
studentOne.presentation();
studentOne.myFuture();
// get the prototype

console.log(Object.getPrototypeOf(studentOne));

/*
  Overriding derived properties
When you add a property to an object, whether it is present in the
prototype or not, the property is added to the object itself. If there was
already a property with the same name in the prototype, this property
will no longer affect the object, as it is now hidden behind the object’s
own property.

C'est un peu comme le super de Python
*/

// je prototype un objet person à partir de studentOne

let personOne = Object.create(studentOne);
personOne.presentation();
// overriding height property on personOne
Student.prototype.height = 170;
console.log(personOne.height); // 170
personOne.height = 180;
console.log(personOne.height); // 180

/* Maps

We saw the word map used in the previous chapter for an operation
that transforms a data structure by applying a function to its elements.
Confusing as it is, in programming the same word is also used for a
related but rather different thing.
A map (noun) is a data structure that associates values (the keys)
with other values.

For example, you might want to map names to ages.
It is possible to use objects for this.
*/

let ages = {
  Boris: 39,
  Liang: 22,
  Júlia: 62,
};

console.log(`Júlia is ${ages["Júlia"]}`);

console.log("Is Jack's age known?", "Jack" in ages);

console.log("Is toString's age known?", "toString" in ages); //true,  here is the PROBLEM!!!

/*
  Here, the object’s property names are the people’s names, and the
property values are their ages. But we certainly didn’t list anybody
named toString in our map. Yet, because plain objects derive from
Object.prototype, it looks like the property is there.

Solution

As such, using plain objects as maps is dangerous. There are several
possible ways to avoid this problem. First, it is possible to create objects
with no prototype. If you pass null to Object.create, the resulting
object will not derive from Object.prototype and can safely be used as
a map.

Object property names must be strings. If you need a map whose
keys can’t easily be converted to strings—such as objects—you cannot
use an object as your map.
Fortunately, JavaScript comes with a class called Map that is written
for this exact purpose. It stores a mapping and allows any type of keys
*/

let aages = new Map();
aages.set("Boris", 39);
aages.set("Liang", 22);
aages.set("Júlia", 62);

console.log(aages.has("toString")); // false

/*
  The methods set, get, and has are part of the interface of the Map
object. Writing a data structure that can quickly update and search a
large set of values isn’t easy, but we don’t have to worry about that.
Someone else did it for us, and we can go through this simple interface
to use their work.
If you do have a plain object that you need to treat as a map for some
reason, it is useful to know that Object.keys returns only an object’s
own keys, not those in the prototype. As an alternative to the in
operator, you can use the hasOwnProperty method, which ignores the
object’s prototype.
*/
console.log(aages.get("Boris")); //39

console.log(Object.keys(ages)); // [ 'Boris', 'Liang', 'Júlia' ]
console.log("toString" in Object.keys(ages)); // true
console.log(ages.hasOwnProperty("toString")); // false BINGO!!!

/*
  Polymorphism
When you call the String function (which converts a value to a string)
on an object, it will call the toString method on that object to try
to create a meaningful string from it. 

Comme personOne herite de studentOne, on va changer le comportement
de la méthode presentation qu'il a hérité de studentOne
*/

personOne.presentation = function () {
  return personOne.name.concat(" a ", personOne.age, " ans.");
};

console.log(personOne.presentation()); // Joseline a 30 ans.

/*
  property names are strings, but they can also be symbols. Symbols are
values created with the Symbol function. Unlike strings, newly created
symbols are unique—you cannot create the same symbol twice.
*/

let sym = Symbol("test");
console.log(sym); // Symbol(test)
let symTwo = Symbol("test");
console.log(symTwo); // Symbol(test)

Student.prototype[sym] = "je teste";
console.log(studentOne[sym]);

// approfondir la lecture sur les symboles

/*
The iterator interface

The object given to a for/of loop is expected to be iterable. This means
it has a method named with the Symbol.iterator symbol (a symbol value
defined by the language, stored as a property of the Symbol function).

When called, that method should return an object that provides a
second interface, iterator. This is the actual thing that iterates. It has
a next method that returns the next result. That result should be an
object with a value property that provides the next value, if there is
one, and a done property, which should be true when there are no more
results and false otherwise.

Note that the next, value, and done property names are plain strings,
not symbols. Only Symbol.iterator, which is likely to be added to a lot
of different objects, is an actual symbol.
We can directly use this interface ourselves.

*/

let okIterator = "Joseline"[Symbol.iterator]();
console.log(okIterator); // Object [String Iterator] {}
console.log(okIterator.next()); // { value: 'J', done: false }
console.log(okIterator.next()); // { value: 'o', done: false }
console.log(okIterator.next()); // { value: 's', done: false }
console.log(okIterator.next());
console.log(okIterator.next());
console.log(okIterator.next());
console.log(okIterator.next());
console.log(okIterator.next()); // { value: 'e', done: false }
console.log(okIterator.next()); // { value: undefined, done: true }

// on a loopé à travers le string "Joseline" avec .next()

class Matrix {
  constructor(width, height, element = (x, y) => undefined) {
    this.width = width;
    this.height = height;
    this.content = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.content[y * width + x] = element(x, y);
      }
    }
  }
  get(x, y) {
    return this.content[y * this.width + x];
  }
  set(x, y, value) {
    this.content[y * this.width + x] = value;
  }
}

let matrix = new Matrix(3, 4);

class MatrixIterator {
  constructor(matrix) {
    this.x = 0;
    this.y = 0;
    this.matrix = matrix;
  }
  next() {
    if (this.y == this.matrix.height) return { done: true };
    let value = {
      x: this.x,
      y: this.y,
      value: this.matrix.get(this.x, this.y),
    };
    this.x++;
    if (this.x == this.matrix.width) {
      this.x = 0;
      this.y++;
    }
    return { value, done: false };
  }
}

let mat = new MatrixIterator(matrix);
mat.x = 3;
mat.y = 4;
console.log(mat.next());
