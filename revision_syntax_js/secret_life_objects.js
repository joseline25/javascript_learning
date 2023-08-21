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
Rabbic.prototype.speak = function (line) {
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

console.log(killRabbit.speak("Nooooo!!"))
console.log(blackRabbit.speak("I'm dark!"))
