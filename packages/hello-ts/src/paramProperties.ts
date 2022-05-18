/* 
class Car {
  make: string
  model: string
  year: number
  constructor(make: string, model: string, year: number) {
    this.make = make
    this.model = model
    this.year = year
  }
}

*TypeScript provides a more concise syntax for code like this, through the use of param properties:
*/

/* class Car {
  constructor(public make: string, public model: string, public year: number) {}
}

const myCar = new Car("Honda", "Accord", 2017);
console.log(myCar.make); */
/* 
This is the only time you will see an access modifier keyword next to something other than a class member. Here’s what this syntax means, conceptually:

class Car {
  constructor(public make: string) {}
}
The first argument passed to the constructor should be a string, and should be available within the scope of the constructor as make. This also creates a public class field on Car called make and pass it the value that was given to the constructor

*It is important to understand the order in which “constructor-stuff” runs.

Here’s an example that will help us understand how this works:

class Base {}
 
class Car extends Base {
  foo = console.log("class field initializer")
  constructor(public make: string) {
    super()
    console.log("custom constructor stuff")
  }
}
 
const c = new Car("honda")

and the equivalent compiled output:

"use strict";
class Base {
}
class Car extends Base {
    constructor(make) {
        super();
        this.make = make;
        this.foo = console.log("class field initializer");
        console.log("custom constructor stuff");
    }
}
const c = new Car("honda");

*Note the following order of what ends up in the class constructor:

1 super()
2 param property initialization
3 other class field initialization
4 anything else that was in your constructor after super()

Also note that, while it is possible in JS to put stuff before super(), the use of class field initializers or param properties disallows this:


*/

class Base {}

class Car extends Base {
  foo = console.log("class field initializer");
  constructor(make: string) {
    console.log("before super");
    super();
    console.log("custom constructor stuff");
  }
}

const c = new Car("honda");
