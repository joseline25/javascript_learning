const SCRIPTS = require("../scripts");

function isEven(n) {
  if (n == 0) {
    return true;
  } else if (n == 1) {
    return false;
  } else {
    return isEven(Math.abs(n - 2));
  }
}

/* Abstraction

doing something == function 


*/

const { isNumberObject } = require("util/types");

function repeat(n, action) {
  for (let index = 0; index < n; index++) {
    action(index);
  }
}

repeat(4, console.log); // 0- 1- 2- 3

function doubleVal(val) {
  return val * 2;
}

repeat(4, doubleVal); // 0 - 2 - 4 - 6

/* We don't need to pass a function necessarily to repeat */

let labels = [];
repeat(5, (i) => {
  labels.push(`Unit ${i + 1}`);
}); // the action parameter was an anonymous function
console.log(labels);

/* 

    Higher-order functions
    Functions that operate on other functions, either by taking them as arguments
    or by returning them, are called higher-order functions.

    Since we have already seen that functions are regular values, there is nothing
    particularly remarkable about the fact that such functions exist.

    The term comes from mathematics, where the distinction between functions
    and other values is taken more seriously.

    Higher-order functions allow us to abstract over actions, not just
    values. They come in several forms. 
    
    
    1 - For example, we can have functions that create new functions.

*/

function greaterThan(n) {
  return (m) => m > n;
}
let greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));

// test if is a multiple of a number

function isMultiple(n) {
  return (m) => m % n == 0; // noter qur le return est une fonction anonyme
}
let isMultiple3 = isMultiple(3); // la création de la function est equivalente à
// la création d'une fonction qui appelle la higer-order function.
console.log(isMultiple3(19));

//  2 - And we can have functions that change other functions

function noisy(f) {
  return (...args) => {
    console.log("calling with", args);
    let result = f(...args);
    console.log("called with", args, ", returned", result);
    return result;
  }; // le return est une fonction anonyme qui prend un nombre indéterminé de paramètres
}
noisy(Math.min)(3, 2, 1);

// take a function and a number. Test if the function return a number if yes;
// test if is a multiple of n if yes divide by n else nothing; if not a number, return
// "it is not a number"

function testDivideByn(f, n) {
  return (num) => {
    let result = f(num);
    if (typeof result == "number") {
      let isMultiplen = isMultiple(n);
      if (isMultiplen(result)) {
        return result / n;
      } else {
        return result;
      }
    } else {
      return " It is not a number";
    }
  };
}

console.log(testDivideByn(doubleVal, 3)(3)); // 2

console.log(testDivideByn(doubleVal, 5)(3));

// 3 - We can even write functions that provide new types of control flow.

function unless(test, then) {
  if (!test) then();
}
repeat(3, (n) => {
  unless(n % 2 == 1, () => {
    console.log(n, "is even");
  });
});

/*

    Script data set
One area where higher-order functions shine is data processing. To
process data, we’ll need some actual data. This chapter will use a data
set about scripts—writing systems such as Latin, Cyrillic, or Arabic.
Remember Unicode from Chapter 1, the system that assigns a number to each 
character in written language? Most of these characters are associated 
with a specific script. The standard contains 140 different
scripts—81 are still in use today, and 59 are historic.

*/

/* 

Filtering arrays
To find the scripts in the data set that are still in use, the following
function might be helpful. It filters out the elements in an array that
don’t pass a test.

*/

function filter(array, test) {
  let passed = [];
  for (let element of array) {
    if (test(element)) {
      passed.push(element);
    }
  }
  return passed;
}

// je crée une liste
const my_array = (n) => {
  let tab = [];
  for (let index = 0; index < n; index++) {
    tab.push(index);
  }
  return tab;
};

// je filtre les elemnts qui sont des multiples de 3
console.log(filter(my_array(26), (val) => isMultiple3(val)));

/*
    Transforming with map
*/

function map(array, transform) {
  let mapped = [];
  for (let element of array) {
    mapped.push(transform(element));
  }
  return mapped;
}

// je trie tous les multiples de 3 entre 0 et 26 et je les divise par 3

console.log(
  map(
    filter(my_array(26), (val) => isMultiple3(val)),
    (s) => s / 3
  )
);

/* 
    Transforming with map

The map method transforms an array by applying a function to all of
its elements and building a new array from the returned values. The
new array will have the same length as the input array, but its content
will have been mapped to a new form by the function.


*/

let tab = filter(my_array(26), isEven);
console.log(tab);
let map_filter = map(tab, (e) => e / 2);
console.log(map_filter);

/*

    Summarizing with reduce
Another common thing to do with arrays is to compute a single value
from them. Our recurring example, summing a collection of numbers,
is an instance of this. Another example is finding the script with the
most characters.
The higher-order operation that represents this pattern is called reduce (sometimes also called fold). It builds a value by repeatedly taking a single element from the array and combining it with the current
value. When summing numbers, you’d start with the number zero and,
for each element, add that to the sum.

The parameters to reduce are, apart from the array, a combining
function and a start value. This function is a little less straightforward
than filter and map, so take a close look at it


*/

function reduce(array, combine, start) {
  let current = start;
  for (let element of array) {
    current = combine(current, element);
  }
  return current;
}
console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0)); // 10

/*

  The standard array method reduce, which of course corresponds to
this function, has an added convenience. If your array contains at least
one element, you are allowed to leave off the start argument. The
method will take the first element of the array as its start value and
start reducing at the second element.


*/
console.log([1, 2, 3, 4].reduce((a, b) => a + b));

function characterCount(script) {
  return script.ranges.reduce((count, [from, to]) => {
    return count + (to - from);
  }, 0);
}

console.log(
  SCRIPTS.reduce((a, b) => {
    return characterCount(a) < characterCount(b) ? b : a;
  })
);

let my_char = "je me debrouille en javascript";
console.log(my_char.split(" ").length);

console.log(my_char.split(" ").reduce((a, b) => a.concat("", b)));

// console.log(SCRIPTS);
function characterScript(code) {
  for (let script of SCRIPTS) {
    if (
      script.ranges.some(([from, to]) => {
        return code >= from && code < to;
      })
    ) {
      return script;
    }
  }
  return null;
}
console.log(characterScript(121));

/* 

  Strings and character codes
One use of the data set would be figuring out what script a piece of
text is using. Let’s go through a program that does this.
Remember that each script has an array of character code ranges
associated with it. So given a character code, we could use a function
like this to find the corresponding script (if any):

*/

function characterScript(code) {
  for (let script of SCRIPTS) {
    if (
      script.ranges.some(([from, to]) => {
        return code >= from && code < to;
      })
    ) {
      return script;
    }
  }
  return null;
}

console.log(characterScript(121));

/* 
  The some method is another higher-order function. It takes a test
function and tells you whether that function returns true for any of the
elements in the array.




Recognizing text
We have a characterScript function and a way to correctly loop over
characters. The next step is to count the characters that belong to each
script. The following counting abstraction will be useful there:


*/

function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex((c) => c.name == name);
    if (known == -1) {
      counts.push({ name, count: 1 });
    } else {
      counts[known].count++;
    }
  }
  return counts;
}
console.log(countBy([1, 2, 3, 4, 5], (n) => n > 2));

/*
  The countBy function expects a collection (anything that we can loop
over with for/of) and a function that computes a group name for a
given element. It returns an array of objects, each of which names a
group and tells you the number of elements that were found in that
group.


It uses another array method—findIndex. This method is somewhat
like indexOf, but instead of looking for a specific value, it finds the first
value for which the given function returns true. Like indexOf, it returns
-1 when no such element is found.
Using countBy, we can write the function that tells us which scripts
are used in a piece of text.
*/

function textScripts(text) {
  let scripts = countBy(text, (char) => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.name : "none";
  }).filter(({ name }) => name != "none");
  let total = scripts.reduce((n, { count }) => n + count, 0);
  if (total == 0) return "No scripts found";
  return scripts
    .map(({ name, count }) => {
      return `${Math.round((count * 100) / total)}% ${name}`;
    })
    .join(", ");
}
console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'));

let arr = [3, 23, 5, 78];

arr.forEach((l) => console.log(doubleVal(l)));

/*
  Summary

  Arrays provide a number of useful higher-order methods. You can
use forEach to loop over the elements in an array. The filter method
returns a new array containing only the elements that pass the predicate function.
 Transforming an array by putting each element through
a function is done with map. You can use reduce to combine all the elements in an 
array into a single value. The some method tests whether
any element matches a given predicate function. And findIndex finds
the position of the first element that matches a predicate.

Exercises

1 - Flattening

Use the reduce method in combination with the concat method 
to “flatten” an array of arrays into a single array that has all the elements of
the original arrays.

*/

let array_of_arrays = [
  [1, 2, 2],
  [4, 3, 5],
  [2, 3, 1],
];

function flattening(array_of_arrays) {
  let new_array = array_of_arrays.reduce((arr1, arr2) => arr1.concat(arr2));

  return new_array;
}

console.log(flattening(array_of_arrays));

/*
  Your own loop
Write a higher-order function loop that provides something like a for
loop statement. It takes a value, a test function, an update function,
and a body function. Each iteration, it first runs the test function on
the current loop value and stops if that returns false. Then it calls the
body function, giving it the current value. Finally, it calls the update
function to create a new value and starts from the beginning.
When defining the function, you can use a regular loop to do the
actual looping.

*/

function higherLoop(value, test_function, body_function, update_function) {
  for (let index = 0; index < value; index++) {
    if (test_function(index) == false) {
      let current_value = index;
      break;
    }
  }
  let body_value = body_function(current_value);

  return update_function(body_value);
}

/*

  Everything
Analogous to the some method, arrays also have an every method. This
one returns true when the given function returns true for every element
in the array. In a way, some is a version of the || operator that acts on
arrays, and every is like the && operator.
Implement every as a function that takes an array and a predicate
function as parameters. Write two versions, one using a loop and one
using the some method.

*/
