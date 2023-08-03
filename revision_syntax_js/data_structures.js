/*
We use Eloquent JavaScript.pdf for all the revision

Chapters 1, 2, 3, 4

Chapter 1 : Values, Types and operators

The types are : number, string, boolean

Some of the unary operators are typeof to get the type of a variable and minus - which 
can also be used as a binary operator


*/

const { read } = require("fs");
const { Readline } = require("readline/promises");

let num = 23;
let st_one = "Je t'aime Jose";
let st_two = "orliane";

console.log(typeof num); // number
console.log(typeof st_one); // string
console.log(typeof st_two); // string
console.log(2 != 3); // true
console.log(2 < 1); // false
console.log(-(10 - 2)); // - as a unary and binary operator, to return -8

// Strings can be compared

console.log("Jose" == "jose"); // false
console.log("Jose" != "jose"); // true
console.log("Jose" <= "jose"); // true

/*
    The way strings are ordered is roughly alphabetic but not really what
you’d expect to see in a dictionary: uppercase letters are always “less”
than lowercase ones, so "Z" < "a", and nonalphabetic characters (!, -,
and so on) are also included in the ordering. When comparing strings,
JavaScript goes over the characters from left to right, comparing the
Unicode codes one by one.

*/

console.log("Jose" <= "jOse"); // true

/*

There is only one value in JavaScript that is not equal to itself, and
that is NaN (“not a number”).

*/

console.log(NaN == NaN); // false

// logical operators

console.log(true && false); // AND, return false
console.log(true || false); // OR, return true

/*
    The logical operators && and || handle values of different types in a
peculiar way. They will convert the value on their left side to Boolean
type in order to decide what to do, but depending on the operator
and the result of that conversion, they will return either the original
left-hand value or the right-hand value.

*/

console.log("Jo" || "jose"); // Jo

console.log(true || "jose"); // true

console.log(null || "jose"); // jose

/* 
    We can use this functionality as a way to fall back on a default value.
If you have a value that might be empty, you can put || after it with
a replacement value. If the initial value can be converted to false,
you’ll get the replacement instead. The rules for converting strings and
numbers to Boolean values state that 0, NaN, and the empty string ("")
count as false, while all the other values count as true. So 0 || -1
produces -1, and "" || "!?" yields "!?".

*/

// ternary operator : operating on  3 variables
// It is written with a question mark and a colon, like this

console.log(true ? 1 : 2); // 1

// is called the conditional operator
// it means if true, return  1 else return 2

// empty values : null, undefined

console.log("5" - 1); // 4

console.log("5" + 1); // 51 (string)

/* 
    When an operator is applied to the “wrong” type of value, JavaScript
will quietly convert that value to the type it needs, using a set of rules
that often aren’t what you want or expect. This is called type coercion.

*/

console.log(8 * null); // 0

// Opérateurs de comparaison (== et ===)

console.log(8 == "8"); // true : compare only values
console.log(8 === "8"); // false  : compare values and types ; the difference here is !==

// Chapter 2 : Program Structure

// A fragment of code that produces a value is called an expression.

/*

get value from input.

in the terminal, npm install prompt-sync to be able to use prompt on the server side


*/

const prompt = require("prompt-sync")({ sigint: true });

let my_name = prompt("Enter your name : ");

console.log(!Number(my_name) ? "Hello " + my_name : "It is not a string!!");

// temperature

switch (prompt("What is the weather like? ")) {
  case "rainy":
    console.log("Remember to bring an umbrella.");
    break;
  case "sunny":
    console.log("Dress lightly.");
  case "cloudy":
    console.log("Go outside.");
    break;
  default:
    console.log("Unknown weather type!");
    break;
}

/*

    Looping a triangle
Write a loop that makes seven calls to console.log to output the following triangle

*/

for (let index = 1; index < 8; index++) {
  console.log("#".repeat(index));
}

/* 
    FizzBuzz
Write a program that uses console.log to print all the numbers from 1
to 100, with two exceptions. For numbers divisible by 3, print "Fizz"
instead of the number, and for numbers divisible by 5 (and not 3), print
"Buzz" instead.



When you have that working, modify your program to print "FizzBuzz
" for numbers that are divisible by both 3 and 5 (and still print "Fizz"
or "Buzz" for numbers divisible by only one of those).
*/

for (let index = 1; index < 101; index++) {
  if (index % 3 == 0) {
    console.log("Fizz");
  } else if (index % 5 == 0) {
    console.log("Buzz");
  } else {
    console.log(index);
  }

  if (index % 3 == 0 && index % 5 == 0) {
    console.log("FizzBuzz");
  }
}

/* 

    Chessboard
Write a program that creates a string that represents an 8×8 grid, using
newline characters to separate lines. At each position of the grid there
is either a space or a "#" character. The characters should form a
chessboard.

*/

function chessboard(the_string) {
  let val;
  for (let index = 0; index < 8; index++) {
    if (index % 2 == 0) {
      val = " " + String(the_string);
      val = val.repeat(4);
    } else {
      val = String(the_string) + " ";
      val = val.repeat(4);
    }
    console.log(val);
  }
}

console.log(chessboard("#"));

/* 

    When you have a program that generates this pattern, define a binding size = 8 
    and change the program so that it works for any size,
outputting a grid of the given width and height.

*/

function chessboard_two(the_string, n) {
  let val;
  for (let index = 0; index < n; index++) {
    if (index % 2 == 0) {
      val = " " + String(the_string);
      val = val.repeat(Math.round(n / 2));
    } else {
      val = String(the_string) + " ";
      val = val.repeat(Math.round(n / 2));
    }
    console.log(val);
  }
}

console.log(chessboard_two("#", 14));

