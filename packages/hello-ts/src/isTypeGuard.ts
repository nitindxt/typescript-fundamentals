/* 
value is Foo

The first kind of user-defined type guard we will review is an is type guard. It is perfectly suited for our example above because it’s meant to work in cooperation with a control flow statement of some sort, to indicate that different branches of the “flow” will be taken based on an evaluation of valueToTest’s type. Pay very close attention to isCarLike’s return type
*/

interface CarLike {
  make: string;
  model: string;
  year: number;
}

let maybeCar: unknown;

// the guard
function isCarLike(valueToTest: any): valueToTest is CarLike {
  return (
    valueToTest &&
    typeof valueToTest === "object" &&
    "make" in valueToTest &&
    typeof valueToTest["make"] === "string" &&
    "model" in valueToTest &&
    typeof valueToTest["model"] === "string" &&
    "year" in valueToTest &&
    typeof valueToTest["year"] === "number"
  );
}

maybeCar; //unknown

// using the guard
if (isCarLike(maybeCar)) {
  maybeCar;
  // ^?
}
