//
// inference of type of variable because of initialisation
//

//let age = 6;

//age = "not a number"; //TypeScript is able to infer that age is a number, based on the fact that we’re initializing it with a value as we are declaring it.

/* Literal Types */

//In TypeScript, variables are “born” with their types.
const age = 6;
/* type of this variable is not number, it’s 6. TS is able to make a more specific assumption here, because:

const variable declarations cannot be reassigned
the initial value assigned to age is a number, which is an immutable value type
Therefore, age will always be 6 in this program. */

/* Implicit any and type annotations     */
// between 500 and 1000
const RANDOM_WAIT_TIME = Math.round(Math.random() * 500) + 500;

let startTime = new Date();
let endTime;

setTimeout(() => {
  endTime = 0;
  endTime = new Date();
}, RANDOM_WAIT_TIME);

/* endTime is “born” without a type, so it ends up being an implicit any.

TypeScript doesn’t have enough information around the declaration site to infer what endTime should be, so it gets the most flexible type: any.

Think of any as “the normal way JS variables work”, in that you could assign endTime to a number, then later a function, then a string.

If we wanted more safety here, we could add a type annotation: */

/* 
// between 500 and 1000
const RANDOM_WAIT_TIME =
  Math.round(Math.random() * 500) + 500
 
let startTime = new Date()
let endTime: Date
      
 
setTimeout(() => {
  endTime = 0
Type 'number' is not assignable to type 'Date'.
  endTime = new Date()
}, RANDOM_WAIT_TIME) 

Now, TypeScript will correctly alert us when we try to flip flop between the number 0 and a Date.
*/

/* Function arguments and return values */

/* The : foo syntax we’ve just seen for variable type annotations can also be used to describe function arguments and return values. In this example it’s not clear, even from the implementation of the function, whether add should accept numbers or strings.

function add(a, b) {
  return a + b // strings? numbers? a mix?
}
Try
Here’s what your in-editor tooltip would look like if you were using this function:

const result = add(3, "4")

result
  
Without type annotations, “anything goes” for the arguments passed into add. Why is this a problem?

const result = add(3, "4")
const p = new Promise(result)

If you’ve ever created a Promise using the promise constructor, you may see that we are using a string where we should use a two-argument function. This is the kind of thing we’d hope that TypeScript could catch for us.

Without type annotations, “anything goes” for the arguments passed into add. Why is this a problem?

Let’s add some type annotations to our function’s arguments:

function add(a: number, b: number) {
  return a + b
}
const result = add(3, "4")
Argument of type 'string' is not assignable to parameter of type 'number'.


Great, now we can enforce that only values of type number are passed into the function, and TS can now determine the return type automatically:

function add(a: number, b: number) {
  return a + b
}
const result = add(3, 4)


If we wanted to specifically state a return type, we could do so using the :foo syntax in one more place

function add(a: number, b: number): number {}
A function whose declared type is neither 'void' nor 'any' must return a value.



This is a great way for code authors to state their intentions up-front. TypeScript will make sure that we live up to this intention, and errors will be surfaced at the location of the function declaration instead of where we use the value returned by the function.
 */
