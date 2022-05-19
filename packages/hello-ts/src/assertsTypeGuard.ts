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
