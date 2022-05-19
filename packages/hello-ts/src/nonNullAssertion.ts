/* 
Non-null assertion operator
The non-null assertion operator (!.) is used to cast away the possibility that a value might be null or undefined.

Keep in mind that the value could still be null or undefined, this operator just tells TypeScript to ignore that possibility.

If the value does turn out to be missing, you will get the familiar cannot call foo on undefined family of errors at runtime:
*/
// @errors: 2532
type GroceryCart = {
  fruits?: { name: string; qty: number }[];
  vegetables?: { name: string; qty: number }[];
};

const cart: GroceryCart = {};

//cart.fruits.push({ name: "kumkuat", qty: 1 }) //!Object is possibly 'undefined'.ts(2532)
//   ^?
cart.fruits!.push({ name: "kumkuat", qty: 1 }); //* ignores null or undefined and throws error at runtime = TypeError: Cannot read properties of undefined (reading 'push')
console.log(cart);

/* 
I recommend against using this in your app or library code, but if your test infrastructure represents a throw as a test failure (most should) this is a great type guard to use in your test suite.

In the above situation, if fruits was expected to be present and it’s not, that’s a very reasonable test failure emoji-tada
*/
