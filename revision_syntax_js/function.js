// Define functions

const { isNumberObject, isStringObject } = require("util/types");

const power = function (val, n) {
  return val ** n;
};
console.log(power(25, 3));

console.log(power(25, 3));

const doubleVal = function (val) {
  return val * 2;
};

// arrow functions with => !!!

// When there is only one parameter name,
// you can omit the parentheses around the parameter list.

const powerTwo = (base, exponent) => {
  let result = 1;
  for (let count = 0; count < exponent; count++) {
    result *= base;
  }
  return result;
};

console.log(powerTwo(25, 3));

/* When an arrow function has no parameters at all, its parameter list
is just an empty set of parentheses.*/

const horn = () => {
  console.log("Toot");
};

horn();

/* Recursion

    It is perfectly okay for a function to call itself, as long as it doesn’t do it
so often that it overflows the stack. A function that calls itself is called
recursive. Recursion allows some functions to be written in a different
style. 

*/

function powerThree(base, exponent) {
  if (exponent == 0) {
    return 1;
  } else {
    return base * powerThree(base, exponent - 1);
  }
}

console.log(powerThree(14, 7));

// Exercises

/* 

    Minimum
The previous chapter introduced the standard function Math.min that
returns its smallest argument. We can build something like that now.
Write a function min that takes two arguments and returns their minimum.
Recursion

*/

const minimum = (a, b) => {
  if (a <= b) {
    return a;
  } else {
    return b;
  }
};

console.log(minimum(34, 32));

/* 

Recursion
We've seen that % (the remainder operator) can be used to test whether
a number is even or odd by using % 2 to see whether it’s divisible by
two. Here’s another way to define whether a positive whole number is
even or odd:
• Zero is even.
• One is odd.
• For any other number N, its evenness is the same as N - 2.
Define a recursive function isEven corresponding to this description.
The function should accept a single parameter (a positive, whole number) 
and return a Boolean.

*/

function isEven(n) {
  if (n == 0) {
    return "Even";
  } else if (n == 1) {
    return "Odd";
  } else {
    return isEven(Math.abs(n - 2));
  }
}

console.log(isEven(-1));

function isEvenTwo(n) {
  return n % 2 == 0;
}

/* 

    Bean counting
You can get the Nth character, or letter, from a string by writing "string
"[N]. The returned value will be a string containing only one character
(for example, "b"). The first character has position 0, which causes the
last one to be found at position string.length - 1. In other words, a
two-character string has length 2, and its characters have positions 0
and 1.
Write a function countBs that takes a string as its only argument and
returns a number that indicates how many uppercase “B” characters
there are in the string.

*/

function countBs(the_string) {
  let val = 0;
  for (let index = 0; index < the_string.length; index++) {
    if (the_string[index] == "B") {
      val += 1;
    }
  }

  return val;
}

/*  

    Next, write a function called countChar that behaves like countBs,
except it takes a second argument that indicates the character that is
to be counted (rather than counting only uppercase “B” characters).

*/

function countChar(the_string, the_char) {
  let val = 0;
  for (let index = 0; index < the_string.length; index++) {
    if (the_string[index] == the_char) {
      val += 1;
    }
  }

  return val;
}

// Rewrite countBs to make use of this new function.

function countBsTwo(the_string) {
  return countChar(the_string, "B");
}

console.log(countBs("BoBO"));
console.log(countBsTwo("Bonjour"));
console.log(countBsTwo("bonjour"));

/* Data Structures

    Numbers, Booleans, and strings are the atoms that data structures are
built from. Many types of information require more than one atom,
though. Objects allow us to group values—including other objects—to
build more complex structures.

*/

// arrays

let my_array = [2, "jose", "danse", 67, true];

// get the first elt of the array

console.log(my_array[0]);

// get the last element

console.log(my_array[my_array.length - 1]);

let my_array_two = [2, 3, 4, 5, 6, 9];

// call the method doubleVal on each value of my_array_two

console.log(my_array_two.map(doubleVal));

console.log(my_array_two.map(isEvenTwo));

// append the double of the last element

console.log(my_array_two.push(my_array_two[my_array_two.length - 1] * 2));

// get the last item of the array

console.log(my_array_two.at(-1));

// check if a certain element is in the array

console.log(my_array_two.includes(18)); // true

// check if all the elts of the array verify a property

console.log(my_array_two.every(isNumberObject));

console.log(my_array_two.every(isEvenTwo));

// objects with properties

let day = {
  date: Date.now(),
  tasks: ["meeting", "python learn", "flutter learn"],
};
// get the value of the attribute date of the object day

console.log(day.date);

// add an attribute

day.weather = "cloudy";

console.log(day.weather);

// going through an array with a simplest method

/* 

    This works not only for arrays but also for strings and some other data
structures.

*/

for (let entry of my_array_two) {
  console.log(entry * 3);
}

// get the index of a value in the array with indexOf
// this method search from the start of the array

console.log(my_array_two.indexOf(9)); // 5

// o search from the end instead of the start, there’s a
// similar method called lastIndexOf.

console.log(my_array_two.lastIndexOf(18, my_array_two.length - 1)); // 6 (faire plus de recherche sur cette methode)

console.log(Math.max(my_array_two)); // NaN

console.log(isNumberObject(my_array_two[0]));

const maxTest = (an_array) => {
  let val = Number(an_array[0]) ? !isNumberObject(an_array[0]) : an_array[0];
  for (let elt of an_array) {
  }
};

// Rest functions

// the three dots ... mean that this function can take an infinite number of arguments

function max(...numbers) {
  let result = -Infinity;
  for (let number of numbers) {
    if (number > result) result = number;
  }
  return result;
}

function maxTwo(an_array) {
  let result = -Infinity;
  for (let number of an_array) {
    if (number > result) result = number;
  }
  return result;
}

let my_second_array = [2, 7, 1];
console.log(my_array_two);
console.log(max(6, 76, 8, -7));
console.log(maxTwo(my_array_two)); // la funtion max ne marche pas ici
console.log(maxTwo(my_second_array));

/* 
  JSON

  Because properties only grasp their value, rather than contain it, objects
and arrays are stored in the computer’s memory as sequences of bits
holding the addresses—the place in memory—of their contents. So an
array with another array inside of it consists of (at least) one memory
region for the inner array, and another for the outer array, containing
(among other things) a binary number that represents the position of
the inner array.


If you want to save data in a file for later or send it to another
computer over the network, you have to somehow convert these tangles
of memory addresses to a description that can be stored or sent.

What we can do is serialize the data. That means it is converted
into a flat description. A popular serialization format is called JSON
(pronounced “Jason”), which stands for JavaScript Object Notation. It
is widely used as a data storage and communication format on the Web,
even in languages other than JavaScript.



JSON looks similar to JavaScript’s way of writing arrays and objects,
with a few restrictions. All property names have to be surrounded
by double quotes (no single quotes), and only simple data expressions are allowed—no
function calls, bindings, or anything that involves actual computation.
Comments are not allowed in JSON.
*/

// Exercises

/* The sum of a range 

    Write a range function that takes two arguments, start and end, and
returns an array containing all the numbers from start up to (and
including) end.

*/

const rangeFunc = (start, end) => {
  let my_array = [];
  if (start <= end) {
    for (let index = start; index <= end; index++) {
      my_array.push(index);
    }
    //   } else {
    //     let val = end;
    //     end = start;
    //     start = val;
    //     rangeFunc(start, end);
  }
  return my_array;
};

/* 
    Next, write a sum function that takes an array of numbers and returns
the sum of these numbers.
*/

const sum = (an_array) => {
  let sum = 0;
  for (let elt of an_array) {
    sum += elt;
  }
  return sum;
};

// Run the example program and see whether it does indeed return 55.

console.log(sum(rangeFunc(1, 10))); // 55

/*  

As a bonus assignment, modify your range function to take an optional 
third argument that indicates the “step” value used when building the array.
If no step is given, the elements go up by increments
of one, corresponding to the old behavior.

The function call range(1,
10, 2) should return [1, 3, 5, 7, 9]. Make sure it also works with
negative step values so that range(5, 2, -1) produces [5, 4, 3, 2].
*/

const rangeFuncModify = (start, end, step) => {
  let my_array = [];
  if (start <= end && step >= 0) {
    for (let index = start; index <= end; index += step) {
      my_array.push(index);
    }
  } else if (end <= start && step <= 0) {
    for (let index = start; index >= end; index += step) {
      my_array.push(index);
    }
  }
  return my_array;
};

console.log(rangeFuncModify(1, 10, 2));
console.log(rangeFuncModify(5, 2, -1));

/* 
    Reversing an array
    Arrays have a reverse method that changes the array by inverting the
order in which its elements appear. For this exercise, write two functions,
 reverseArray and reverseArrayInPlace. The first, reverseArray,
takes an array as argument and produces a new array that has the
same elements in the inverse order. The second, reverseArrayInPlace,
does what the reverse method does: it modifies the array given as argument 
by reversing its elements. Neither may use the standard reverse
method.


*/

function reverseArray(an_array) {
  let new_array = [];
  for (let elt of an_array) {
    new_array.unshift(elt);
  }

  return new_array;
}

function reverseArrayInPlace(an_array) {
  let new_array = [];
  for (let elt of an_array) {
    new_array.unshift(elt);
  }
  an_array = new_array;
  return an_array;
}

/* 

    A list
Objects, as generic blobs of values, can be used to build all sorts of data
structures. A common data structure is the list (not to be confused with
array). A list is a nested set of objects, with the first object holding a
reference to the second, the second to the third, and so on.

*/

let list = {
  value: 1,
  rest: {
    value: 2,
    rest: {
      value: 3,
      rest: null,
    },
  },
};

/* 
    Write a function arrayToList that builds up a list structure like the
one shown when given [1, 2, 3] as argument.
*/

function arrayToList(an_array) {
  //let list = {};
  let rest_end = { value: an_array.pop(), rest: null };

  while (an_array.length > 0) {
    let rest = { value: an_array.pop(), rest: rest_end };
    rest_end = rest;
  }
  return rest_end;
}

console.log(arrayToList([1, 2, 3])); // YES!!!!!

/*  
    Also write a listToArray
function that produces an array from a list. 

*/

function listToArray(a_list) {
  let an_array = [];

  do {
    an_array.push(a_list.value);
    a_list = a_list.rest;
  } while (a_list.rest != null);
  an_array.push(a_list.value);
  return an_array;
}

console.log(listToArray(list));

/* Helper functions

    
add a helper function
prepend, which takes an element and a list and creates a new list that
adds the element to the front of the input list, and nth, which takes a
list and a number and returns the element at the given position in the
list (with zero referring to the first element) or undefined when there is
no such element.
If you haven’t already, also write a recursive version of nth.

*/

const prepend = (an_element, an_list) => {
  let new_list = {};
  new_list.value = an_element;
  new_list.rest = an_list;
  return new_list;
};

const nth = (a_list, a_number) => {
  let index = 0;
  let list = a_list;
  while (index < a_number) {
    list = list.rest;
    index++;
  }

  if (list != null) {
    return list.value;
  } else {
    return undefined;
  }
};
console.log(list);
console.log(nth(list, 2));

// If you haven’t already, also write a recursive version of nth.
function nthRecursive(a_list, a_number) {
  let index = 0;

  if (a_list != null && a_number == index) {
    return a_list.value;
  } else if (a_list != null) {
    a_number = a_number - 1;
    return nthRecursive(a_list.rest, a_number);
  } else {
    return undefined;
  }
}

console.log(nthRecursive(list, 1));

/* 

  Deep comparison
The == operator compares objects by identity. But sometimes you’d
prefer to compare the values of their actual properties.
Write a function deepEqual that takes two values and returns true
only if they are the same value or are objects with the same properties,
where the values of the properties are equal when compared with a
recursive call to deepEqual.
To find out whether values should be compared directly (use the ===
operator for that) or have their properties compared, you can use the
typeof operator. If it produces "object" for both values, you should do a
deep comparison. But you have to take one silly exception into account:
because of a historical accident, typeof null also produces "object".
The Object.keys function will be useful when you need to go over the
properties of objects to compare them.


*/

function deepEqual(object_one, object_two) {
  if (
    typeof object_one == typeof object_two &&
    typeof object_one != Object &&
    object_one !== null &&
    object_two !== null
  ) {
    return object_one === object_two;
  } else {
    if (object_one.keys == object_two.keys) {
      let val = true;
      for (let key of object_one) {
        val = val && object_one.key === object_two.value;
      }
      return val;
    } else {
      return false;
    }
  }
}
console.log(deepEqual(list, arrayToList([1, 2, 3, 4])));
console.log(deepEqual(3, 4));

// Rest parameters revision


const sumTwo = (...numbers) => {
  let result = 0;
  for (let number of numbers) {
    result += number;
  }
  return result;
};
console.log(sumTwo(2,3, 4, 5))

const concatELements = (...elements) => {
  
  return [...elements];
};
console.log(concatELements(2, 3, 4, 5))
let {name} = {name: "Faraji", age: 23};
console.log(name);