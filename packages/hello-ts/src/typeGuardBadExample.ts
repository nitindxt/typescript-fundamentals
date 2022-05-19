/* 

Writing high-quality guards
Type guards can be thought of as part of the “glue” that connects compile-time type-checking with the execution of your program at runtime. It’s of great importance that these are designed well, as TypeScript will take you at your word when you make a claim about what the return value (or throw/no-throw behavior) indicates.

Let’s look at a bad example of a type guard:
*/

function isNull(val: any): val is null {
  return !val;
}

const empty = "";
const zero = 0;
if (isNull(zero)) {
  console.log(zero); // is it really impossible to get here?
  //          ^?
}
if (isNull(empty)) {
  console.log(empty); // is it really impossible to get here?
  //           ^?
}

/* 
Click Try on this snippet and run this in the TypeScript playground. We see both 0 and "" logged to the console.

Common mistakes like forgetting about the possibilities of strings and numbers being falsy can create false confidence in the correctness of your code. “Untruths” in your type guards will propagate quickly through your codebase and cause problems that are quite difficult to solve.

In cases where the rest of your code relies on a particular value being of a certain type, make sure to throw an error so that unexpected behavior is LOUD instead of quiet.


*/