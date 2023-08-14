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
