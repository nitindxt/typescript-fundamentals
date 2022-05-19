/* 
asserts value is Foo

There is another approach we could take that eliminates the need for a conditional. Pay very close attention to assertsIsCarLike’s return type:

*/

interface CarLike {
  make: string;
  model: string;
  year: number;
}

let maybeCar: unknown;

// the guard
function assertsIsCarLike(valueToTest: any): asserts valueToTest is CarLike {
  if (
    valueToTest &&
    typeof valueToTest === "object" &&
    "make" in valueToTest &&
    typeof valueToTest["make"] === "string" &&
    "model" in valueToTest &&
    typeof valueToTest["model"] === "string" &&
    "year" in valueToTest &&
    typeof valueToTest["year"] === "number"
  )
    throw new Error(`Value does not appear to be a CarLike ${valueToTest}`);
}

// using the guard
maybeCar;
// ^?
assertsIsCarLike(maybeCar);
maybeCar;
// ^?

/* 
Conceptually, what’s going on behind the scenes is very similar. By using this special syntax to describe the return type, we are informing TypeScript that if assertsIsCarLike throws an error, it should be taken as an indication that the valueToTest is NOT type-equivalent to CarLike.

Therefore, if we get past the assertion and keep executing code on the next line, the type changes from unknown to CarLike.
*/