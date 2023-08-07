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

let arr = [3, 23, 5, 78];

arr.forEach((l) => doubleVal(l)); // correct this

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
