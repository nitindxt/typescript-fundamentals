/* Bottom type: never
A bottom type (symbol: ⊥) is a type that describes no possible value allowed by the system. To use our set theory mental model, we could describe this as “any value from the following set: { } (intentionally empty)”

TypeScript provides one bottom type: never.

At first glance, this may appear to be an extremely abstract and pointless concept, but there’s one use case that should convince you otherwise. Let’s take a look at this scenario below.

Exhaustive conditionals
Let’s consider the following scenario: */

/* class Car {
  drive() {
    console.log("vroom");
  }
}
class Truck {
  tow() {
    console.log("dragging something");
  }
}
type Vehicle = Truck | Car;

let myVehicle: Vehicle = obtainRandomVehicle();

// The exhaustive conditional
if (myVehicle instanceof Truck) {
  myVehicle.tow(); // Truck
} else if (myVehicle instanceof Car) {
  myVehicle.drive(); // Car
} else {
  // NEITHER!
  const neverValue: never = myVehicle;
}
 */
// Now, leaving the conditional exactly as-is, let’s add Boat as a vehicle type:
/* 
class Car {
  drive() {
    console.log("vroom");
  }
}
class Truck {
  tow() {
    console.log("dragging something");
  }
}
class Boat {
  isFloating() {
    return true;
  }
}
type Vehicle = Truck | Car | Boat;

let myVehicle: Vehicle = obtainRandomVehicle(); */

// The exhaustive conditional
/* if (myVehicle instanceof Truck) {
  myVehicle.tow(); // Truck
} else if (myVehicle instanceof Car) {
  myVehicle.drive(); // Car
} else {
  // NEITHER!
  const neverValue: never = myVehicle;//Type 'Boat' is not assignable to type 'never'.
}
 */
/* 
Effectively, what has happened here is that we have been alerted to the fact that a new possibility for Vehicle has been introduced. As a result, we don’t end up with the type for myVehicle as a never in that final else clause.

I recommend handling this a little more gracefully via an error subclass:
*/

function obtainRandomVehicle(): any {
  return {} as any;
}
class Car {
  drive() {
    console.log("vroom");
  }
}
class Truck {
  tow() {
    console.log("dragging something");
  }
}
class Boat {
  isFloating() {
    return true;
  }
}
type Vehicle = Truck | Car | Boat;

let myVehicle: Vehicle = obtainRandomVehicle();
/// ---cut---
class UnreachableError extends Error {
  constructor(_nvr: never, message: string) {
    super(message);
  }
}

// The exhaustive conditional
if (myVehicle instanceof Truck) {
  myVehicle.tow(); // Truck
} else if (myVehicle instanceof Car) {
  myVehicle.drive(); // Car
} else {
  // NEITHER!
  throw new UnreachableError(
    myVehicle,
    `Unexpected vehicle type: ${myVehicle}`
  );
}
/* 
  Now, one of three things will happen in that final else block

We will have handled every case before reaching it, and thus we will never enter the final else block
We will catch upstream code changes that need to be handled in this conditional at compile time (e.g., adding the Boat case)
If somehow an unexpected value “slip through” and is not caught until we actually run the code, we will get a meaningful error message
Note that this approach works nicely with a switch statement, when the UnreachableError is thrown from the default case clause.
  */
