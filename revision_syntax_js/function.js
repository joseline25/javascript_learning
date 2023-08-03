// Define functions

const power = function (val, n) {
  return val ** n;
};
console.log(power(25, 3));

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

console.log(isEven(-52));
